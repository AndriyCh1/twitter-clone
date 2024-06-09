import { Response } from 'express';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  request,
  requestBody,
  response,
} from 'inversify-express-utils';

import TYPES from '../../common/constants/container-types';
import auth from '../../common/middlewares/auth.middleware';
import validate from '../../common/middlewares/validator.middleware';
import { IUserRequest } from '../../common/types/user-requst';
import { attachJwtCookie, removeJwtCookie } from '../../common/utils/jwt-cookie';
import { AuthService } from './auth.service';
import { LoginDto } from './validators/login.schema';
import { SignupDto, signupSchema } from './validators/signup.schema';

@controller('/auth')
export class AuthController extends BaseHttpController {
  constructor(@inject(TYPES.AuthService) private readonly authService: AuthService) {
    super();
  }

  @httpPost('/login')
  public async login(@requestBody() body: LoginDto, @response() res: Response) {
    const { token, user } = await this.authService.login(body);
    attachJwtCookie(res, token);
    return user;
  }

  @httpPost('/signup', validate(signupSchema))
  public async signup(@requestBody() body: SignupDto, @response() res: Response) {
    const { user, token } = await this.authService.signup(body);
    attachJwtCookie(res, token);
    return user;
  }

  @httpPost('/logout')
  public async logout(@response() res: Response) {
    removeJwtCookie(res);
    return true;
  }

  @httpGet('/me', auth())
  public async getMe(@request() req: IUserRequest) {
    return this.authService.getMe(req.user.id);
  }
}
