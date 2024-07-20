import { inject, injectable } from 'inversify';
import sharp from 'sharp';

import TYPES from '../../common/constants/container-types';
import { Notification, NotificationType, Post, SavedPost, User } from '../../common/models';
import { cloudfrontPath } from '../../common/utils/cloudfront-path';
import { env } from '../../common/utils/env-config';
import { generateUniqueKey } from '../../common/utils/generate-unique-key';
import { paginate } from '../../common/utils/paginate-response';
import { ForbiddenException, NotFoundException } from '../../config';
import { S3Service } from '../../providers/s3/s3.service';
import { CommentPostData, CreatePostData, GetPostsData } from './types';

const IMAGE_UPLOAD_BUCKET = env.S3_BUCKET;

@injectable()
export class PostsService {
  constructor(@inject(TYPES.S3Service) private readonly s3Service: S3Service) {}

  public async getAllPosts(data: GetPostsData) {
    const { page, pageSize } = data;

    const [posts, totalRecords] = await Promise.all([
      Post.find()
        .sort({ createdAt: -1 })
        .populate({ path: 'user', select: { password: 0 } })
        .populate({ path: 'comments.user', select: { password: 0 } })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      Post.countDocuments(),
    ]);

    return paginate(posts, totalRecords, page, pageSize);
  }

  public async getUserPosts(data: GetPostsData & { username: string }) {
    const { page, pageSize, username } = data;
    const user = await User.findOne({ username }).select({ password: 0 });
    if (!user) throw new NotFoundException('User not found');

    const [posts, totalRecords] = await Promise.all([
      Post.find({ user: user._id })
        .sort({ createdAt: -1 })
        .populate({ path: 'user', select: { password: 0 } })
        .populate({ path: 'comments.user', select: { password: 0 } })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      Post.countDocuments({ user: user._id }),
    ]);
    return paginate(posts, totalRecords, page, pageSize);
  }

  public async getLikedPosts(data: GetPostsData & { userId: string }) {
    const { page, pageSize, userId } = data;

    const user = await User.findById(userId);

    if (!user) throw new NotFoundException('User not found');

    const [posts, totalRecords] = await Promise.all([
      Post.find({ _id: { $in: user.likedPosts } })
        .sort({ createdAt: -1 })
        .populate({ path: 'user', select: { password: 0 } })
        .populate({ path: 'comments.user', select: { password: 0 } })
        .skip((page - 1) * pageSize)
        .limit(pageSize),

      Post.countDocuments({ _id: { $in: user.likedPosts } }),
    ]);

    return paginate(posts, totalRecords, page, pageSize);
  }

  public async getFollowingPosts(data: GetPostsData & { userId: string }) {
    const { page, pageSize, userId } = data;
    const skip = (page - 1) * pageSize;

    const user = await User.findById(userId);

    if (!user) throw new NotFoundException('User not found');

    const [posts, totalRecords] = await Promise.all([
      Post.find({ user: { $in: user.following } })
        .sort({ createdAt: -1 })
        .populate({ path: 'user', select: { password: 0 } })
        .populate({ path: 'comments.user', select: { password: 0 } })
        .skip(skip)
        .limit(pageSize),
      Post.countDocuments({ user: { $in: user.following } }),
    ]);

    return paginate(posts, totalRecords, page, pageSize);
  }

  public async createPost(data: CreatePostData, userId: string) {
    const { text, img } = data;

    const user = await User.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    let imageName: string | undefined;

    if (img) {
      imageName = generateUniqueKey();
      const buffer = await sharp(img.buffer).resize({ height: 1080, width: 1920, fit: 'contain' }).toBuffer();
      await this.s3Service.putObject(IMAGE_UPLOAD_BUCKET, imageName, buffer, img.mimetype);
    }

    const newPost = new Post({ user: userId, text, img: imageName && cloudfrontPath(imageName) });

    await newPost.save();
    return newPost;
  }

  public async likeUnlikePost(postId: string, userId: string) {
    const post = await Post.findById(postId);

    if (!post) throw new NotFoundException('Post not found');
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });
      const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());
      return updatedLikes;
    }

    post.likes.push(userId);
    await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
    await post.save();

    const notification = new Notification({
      from: userId,
      to: post.user,
      type: NotificationType.LIKE,
    });

    await notification.save();

    return post.likes;
  }

  public async commentOnPost(postId: string, data: CommentPostData, userId: string) {
    const post = await Post.findById(postId);

    if (!post) throw new NotFoundException('Post not found');

    const updatedPost = await Post.findByIdAndUpdate(
      post._id,
      { $push: { comments: { text: data.text, user: userId } } },
      { returnDocument: 'after' }
    );

    return updatedPost;
  }

  public async deletePost(postId: string, userId: string) {
    const post = await Post.findById(postId);

    if (!post) throw new NotFoundException('Post not found');

    if (post.user.toString() !== userId.toString()) {
      throw new ForbiddenException('You are not authorized to delete this post');
    }

    if (post.img) {
      await this.s3Service.removeObject(IMAGE_UPLOAD_BUCKET, post.img);
    }

    await Post.findByIdAndDelete(post._id);

    return { message: 'Post deleted successfully' };
  }

  public async savePost(postId: string, userId: string) {
    const post = await Post.findById(postId);
    if (!post) throw new NotFoundException('Post not found');

    await SavedPost.create({ userId, postId });
  }

  public async getSavedPosts(data: GetPostsData & { userId: string }) {
    const { userId, page, pageSize } = data;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [posts, totalRecords] = await Promise.all([
      SavedPost.find({ userId })
        .populate({ path: 'userId', select: { password: 0, likedPosts: 0, followers: 0, following: 0 } })
        .populate({ path: 'postId' })
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      SavedPost.countDocuments({ userId }),
    ]);

    return paginate(posts, totalRecords, page, pageSize);
  }
}
