import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost } from 'inversify-express-utils';

import TYPES from '../../common/constants/container-types';
import { AuthService } from './auth.service';

@controller('/auth')
export class AuthController extends BaseHttpController {
  constructor(@inject(TYPES.AuthService) private readonly authService: AuthService) {
    super();
  }

  @httpPost('/login')
  public async login() {
    return this.authService.login();
  }

  @httpPost('/signup')
  public async signup() {
    return this.authService.signup();
  }

  @httpPost('/logout')
  public async logout() {
    return this.authService.logout();
  }
}
