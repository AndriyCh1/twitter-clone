import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  request,
  requestBody,
  requestParam,
} from 'inversify-express-utils';

import TYPES from '../../common/constants/container-types';
import auth from '../../common/middlewares/auth.middleware';
import validate from '../../common/middlewares/validator.middleware';
import { IUserRequest } from '../../common/types/user-request';
import { PostsService } from './posts.service';
import { CommentPostDto, commentPostSchema } from './validators/comment-post.schema';
import { CreatePostDto, createPostSchema } from './validators/create-post.schema';

@controller('/posts')
export class PostsController extends BaseHttpController {
  constructor(@inject(TYPES.PostsService) private readonly postsService: PostsService) {
    super();
  }

  @httpGet('/')
  public async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @httpGet('/user/:username', auth())
  public async getUserPosts(@requestParam('username') username: string) {
    return this.postsService.getUserPosts(username);
  }

  @httpGet('/liked/:id', auth())
  public async getLikedPosts(@requestParam('id') userId: string) {
    return this.postsService.getLikedPosts(userId);
  }

  @httpGet('/following', auth())
  public async getFollowingPosts(@request() req: IUserRequest) {
    return this.postsService.getFollowingPosts(req.user.id);
  }

  @httpPost('/', auth(), validate(createPostSchema))
  public async createPost(@requestBody() dto: CreatePostDto, @request() req: IUserRequest) {
    const userId = req.user.id;
    return this.postsService.createPost(dto, userId);
  }

  @httpPatch('/like/:id', auth())
  public async likeUnlikePost(@requestParam('id') postId: string, @request() req: IUserRequest) {
    const userId = req.user.id;
    return this.postsService.likeUnlikePost(postId, userId);
  }

  @httpPatch('/comment/:id', auth(), validate(commentPostSchema))
  public async commentOnPost(
    @requestParam('id') postId: string,
    @requestBody() dto: CommentPostDto,
    @request() req: IUserRequest
  ) {
    const userId = req.user.id;
    return this.postsService.commentOnPost(postId, dto, userId);
  }

  @httpDelete('/:id', auth())
  public async deletePost(@requestParam('id') postId: string, @request() req: IUserRequest) {
    const userId = req.user.id;
    return this.postsService.deletePost(postId, userId);
  }
}
