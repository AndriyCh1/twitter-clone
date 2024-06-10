import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPut,
  request,
  requestBody,
  requestParam,
} from 'inversify-express-utils';

import TYPES from '../../common/constants/container-types';
import auth from '../../common/middlewares/auth.middleware';
import validate from '../../common/middlewares/validator.middleware';
import { IUserRequest } from '../../common/types/user-request';
import { UsersService } from './users.service';
import { UpdateProfileDto, updateProfileSchema } from './validators/update-profile.schema';

@controller('/users')
export class UsersController extends BaseHttpController {
  constructor(@inject(TYPES.UsersService) private readonly usersService: UsersService) {
    super();
  }

  @httpGet('/profile/:username')
  public async getUserProfile(@requestParam('username') username: string) {
    return this.usersService.getUserProfile(username);
  }

  @httpGet('/suggested', auth())
  public async getSuggestedUsers(@request() req: IUserRequest) {
    return this.usersService.getSuggestedUsers(req.user.id);
  }

  @httpPut('/follow/:id', auth())
  public async followUnfollowUser(@request() req: IUserRequest, @requestParam('id') userId: string) {
    return this.usersService.followUnfollowUser(userId, req.user.id);
  }

  @httpPut('/update', auth(), validate(updateProfileSchema))
  public async updateUserProfile(@request() req: IUserRequest, @requestBody() body: UpdateProfileDto) {
    return this.usersService.updateUserProfile(req.user.id, body);
  }
}
