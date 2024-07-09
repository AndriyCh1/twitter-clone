import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  queryParam,
  request,
  requestBody,
  requestParam,
} from 'inversify-express-utils';

import TYPES from '../../common/constants/container-types';
import auth from '../../common/middlewares/auth.middleware';
import validate from '../../common/middlewares/validator.middleware';
import { IUserRequest } from '../../common/types/user-request';
import { upload } from '../../config/multer.config';
import { PostsService } from './posts.service';
import { CommentPostDto, commentPostSchema } from './validators/comment-post.schema';
import { CreatePostDto, createPostSchema } from './validators/create-post.schema';
import { getPostsSchema } from './validators/get-posts.schema';

type MulterFile = Express.Multer.File;

@controller('/posts')
export class PostsController extends BaseHttpController {
  constructor(@inject(TYPES.PostsService) private readonly postsService: PostsService) {
    super();
  }

  @httpGet('/', validate(getPostsSchema))
  public async getAllPosts(@queryParam('page') page: number = 1, @queryParam('pageSize') pageSize: number = 20) {
    return this.postsService.getAllPosts({ page, pageSize });
  }

  @httpGet('/user/:username', auth(), validate(getPostsSchema))
  public async getUserPosts(
    @requestParam('username') username: string,
    @queryParam('page') page: number = 1,
    @queryParam('pageSize') pageSize: number = 20
  ) {
    return this.postsService.getUserPosts({ username, page, pageSize });
  }

  @httpGet('/liked/:id', auth())
  public async getLikedPosts(
    @queryParam('page') page: number = 1,
    @queryParam('pageSize') pageSize: number = 20,
    @requestParam('id') userId: string
  ) {
    return this.postsService.getLikedPosts({ userId, page, pageSize });
  }

  @httpGet('/following', auth(), validate(getPostsSchema))
  public async getFollowingPosts(
    @queryParam('page') page: number = 1,
    @queryParam('pageSize') pageSize: number = 20,
    @request() req: IUserRequest
  ) {
    const dto = { page, pageSize, userId: req.user.id };
    return this.postsService.getFollowingPosts(dto);
  }

  @httpPost('/', auth(), upload.single('img'), validate(createPostSchema))
  public async createPost(@requestBody() dto: CreatePostDto, @request() req: IUserRequest & { file: MulterFile }) {
    const userId = req.user.id;
    const file = req.file;
    return this.postsService.createPost({ ...dto, img: file }, userId);
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
