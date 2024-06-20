import { inject, injectable } from 'inversify';
import sharp from 'sharp';

import TYPES from '../../common/constants/container-types';
import { Notification, NotificationType, User } from '../../common/models';
import Post from '../../common/models/posts.model';
import { env } from '../../common/utils/env-config';
import { generateUniqueKey } from '../../common/utils/generate-unique-key';
import { ForbiddenException, NotFoundException } from '../../config';
import { S3Service } from '../../providers/s3/s3.service';
import { CommentPostData } from './types/comment-post-data.type';
import { CreatePostData } from './types/create-post-data.type';

const IMAGE_UPLOAD_BUCKET = env.S3_BUCKET;

@injectable()
export class PostsService {
  constructor(@inject(TYPES.S3Service) private readonly s3Service: S3Service) {}

  /** Build post image url from image key in S3 */
  private getPostImageUrl = (img: string) => {
    return env.CLOUDFRONT_URL + '/' + img;
  };

  public async getAllPosts() {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: 'user', select: { password: 0 } })
      .populate({ path: 'comments.user', select: { password: 0 } });

    for (const post of posts) {
      if (post.img) post.img = this.getPostImageUrl(post.img);
    }
    return posts;
  }

  public async getUserPosts(username: string) {
    const user = await User.findOne({ username }).select({ password: 0 });
    if (!user) throw new NotFoundException('User not found');

    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({ path: 'user', select: { password: 0 } })
      .populate({ path: 'comments.user', select: { password: 0 } });
    return posts || [];
  }

  public async getLikedPosts(userId: string) {
    const user = await User.findById(userId);

    if (!user) throw new NotFoundException('User not found');

    const posts = await Post.find({ _id: { $in: user.likedPosts } })
      .sort({ createdAt: -1 })
      .populate({ path: 'user', select: { password: 0 } })
      .populate({ path: 'comments.user', select: { password: 0 } });

    for (const post of posts) {
      if (post.img) post.img = this.getPostImageUrl(post.img);
    }

    return posts;
  }

  public async getFollowingPosts(userId: string) {
    const user = await User.findById(userId);

    if (!user) throw new NotFoundException('User not found');

    const posts = await Post.find({ user: { $in: user.following } })
      .sort({ createdAt: -1 })
      .populate({ path: 'user', select: { password: 0 } })
      .populate({ path: 'comments.user', select: { password: 0 } });

    for (const post of posts) {
      if (post.img) post.img = this.getPostImageUrl(post.img);
    }

    return posts;
  }

  public async createPost(data: CreatePostData, userId: string) {
    const { text, img } = data;

    const user = await User.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    let imageName: string | undefined;

    if (img) {
      imageName = generateUniqueKey();
      const buffer = await sharp(img.buffer).resize({ height: 1920, width: 1080, fit: 'contain' }).toBuffer();
      await this.s3Service.putObject(IMAGE_UPLOAD_BUCKET, imageName, buffer, img.mimetype);
    }

    const newPost = new Post({ user: userId, text, img: imageName });

    await newPost.save();
    if (imageName) newPost.img = this.getPostImageUrl(imageName);
    return newPost;
  }

  public async likeUnlikePost(postId: string, userId: string) {
    const post = await Post.findById(postId);

    if (!post) throw new NotFoundException('Post not found');
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });
      return;
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
  }

  public async commentOnPost(postId: string, data: CommentPostData, userId: string) {
    const post = await Post.findById(postId);

    if (!post) throw new NotFoundException('Post not found');

    const updatedPost = await Post.findByIdAndUpdate(post._id, {
      $push: { comments: { text: data.text, user: userId } },
    });

    if (updatedPost?.img) updatedPost.img = this.getPostImageUrl(updatedPost.img);
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
}
