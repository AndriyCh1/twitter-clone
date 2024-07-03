import bcrypt from 'bcryptjs';
import { inject, injectable } from 'inversify';

import TYPES from '../../common/constants/container-types';
import { IUser, Notification, User } from '../../common/models';
import { cloudfrontPath } from '../../common/utils/cloudfront-path';
import { env } from '../../common/utils/env-config';
import { generateUniqueKey } from '../../common/utils/generate-unique-key';
import { BadRequestException, Logger, NotFoundException } from '../../config';
import { S3Service } from '../../providers/s3/s3.service';
import { UpdateProfileData } from './types/update-profile.type';

const IMAGE_UPLOAD_BUCKET = env.S3_BUCKET;

@injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@inject(TYPES.S3Service) private readonly s3Service: S3Service) {}

  public async getUserProfile(username: string) {
    const user = await User.findOne({ username }).select({ password: 0 });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async getSuggestedUsers(userId: string) {
    try {
      const usersFollowedByMe = await User.findById(userId).select({ following: 1 });

      if (!usersFollowedByMe) return [];

      const users: IUser[] = await User.aggregate([{ $match: { _id: { $ne: userId } } }, { $sample: { size: 10 } }]);

      const filtered = users
        .filter((u) => !usersFollowedByMe.following.includes(u._id))
        .slice(0, 4)
        .map((u) => ({ ...u, password: null }));

      return filtered;
    } catch (error) {
      if (error instanceof Error) this.logger.error(`Error while fetching suggested users: ${error.message}`);
      throw error;
    }
  }

  public async followUnfollowUser(userId: string, currentUserId: string) {
    if (userId === currentUserId) {
      throw new BadRequestException('You cannot follow yourself');
    }

    const userToFollow = await User.findById(userId);

    if (!userToFollow) {
      throw new NotFoundException('User not found');
    }

    const currentUser = await User.findById(currentUserId);

    if (!currentUser) {
      throw new NotFoundException('User not found');
    }

    const isFollowing = currentUser.following.includes(userId);

    if (isFollowing) {
      await User.findByIdAndUpdate(currentUserId, { $pull: { following: userId } });
      await User.findByIdAndUpdate(userId, { $pull: { followers: currentUserId } });
      return { message: 'User unfollowed' };
    } else {
      await User.findByIdAndUpdate(currentUserId, { $push: { following: userId } });
      await User.findByIdAndUpdate(userId, { $push: { followers: currentUserId } });

      const newNotification = new Notification({
        from: currentUserId,
        to: userId,
        type: 'follow',
      });

      await newNotification.save();
      return { message: 'User followed' };
    }
  }

  public async updateUserProfile(id: string, body: UpdateProfileData) {
    const { fullName, username, email, profileImg, coverImg, bio, link, currentPassword, newPassword } = body;

    const user = await User.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (currentPassword && newPassword) {
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

      if (!isPasswordValid) {
        throw new BadRequestException('Current password is incorrect');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;
    }

    if (profileImg) {
      if (user.profileImg) {
        await this.s3Service.removeObject(IMAGE_UPLOAD_BUCKET, user.profileImg);
      }
      const imageName = generateUniqueKey();
      await this.s3Service.putObject(IMAGE_UPLOAD_BUCKET, imageName, profileImg.buffer);

      user.profileImg = cloudfrontPath(imageName);
    }

    if (coverImg) {
      if (user.coverImg) {
        await this.s3Service.removeObject(IMAGE_UPLOAD_BUCKET, user.coverImg);
      }

      const imageName = generateUniqueKey();
      await this.s3Service.putObject(IMAGE_UPLOAD_BUCKET, imageName, coverImg.buffer);
      user.coverImg = cloudfrontPath(imageName);
    }

    if (email && email !== user.email) {
      const userExists = await User.findOne({ email });

      if (userExists) {
        throw new BadRequestException('Email already in use');
      }

      user.email = email;
    }

    user.fullName = fullName || user.fullName;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    await user.save();

    return User.findById(id).select({ password: 0 });
  }
}
