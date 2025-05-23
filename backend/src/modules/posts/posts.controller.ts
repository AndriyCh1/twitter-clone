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
import {
  CommentPostDto,
  commentPostSchema,
  CreatePostDto,
  createPostSchema,
  getPostsSchema,
  SavePostDto,
  savePostSchema,
} from './validators';

type MulterFile = Express.Multer.File;

@controller('/posts')
export class PostsController extends BaseHttpController {
  constructor(@inject(TYPES.PostsService) private readonly postsService: PostsService) {
    super();
  }

  @httpGet('/', auth(), validate(getPostsSchema))
  public async getAllPosts(
    @request() req: IUserRequest,
    @queryParam('page') page: number = 1,
    @queryParam('pageSize') pageSize: number = 20
  ) {
    return this.postsService.getAllPosts({ page, pageSize, userId: req.user?.id });
  }

  @httpGet('/user/:username', auth(), validate(getPostsSchema))
  public async getUserPosts(
    @request() req: IUserRequest,
    @requestParam('username') username: string,
    @queryParam('page') page: number = 1,
    @queryParam('pageSize') pageSize: number = 20
  ) {
    return this.postsService.getUserPosts({ username, page, pageSize, authUserId: req.user?.id });
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

  @httpPost('/save', auth(), validate(savePostSchema))
  public async savePost(@request() req: IUserRequest, @requestBody() dto: SavePostDto) {
    return this.postsService.saveUnsavePost(dto.postId, req.user.id);
  }

  @httpGet('/saved', auth(), validate(getPostsSchema))
  public async getSavedPosts(
    @queryParam('page') page: number = 1,
    @queryParam('pageSize') pageSize: number = 20,
    @request() req: IUserRequest
  ) {
    const dto = { page, pageSize, userId: req.user?.id };
    return this.postsService.getSavedPosts(dto);
  }
}
