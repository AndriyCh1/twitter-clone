import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet } from 'inversify-express-utils';

import TYPES from '../../common/constants/container-types';
import { AuthService } from './auth.service';

@controller('/auth')
export class AuthController extends BaseHttpController {
  constructor(@inject(TYPES.AuthService) private readonly authService: AuthService) {
    super();
  }

  @httpGet('/login')
  login() {
    return this.authService.login();
  }
}
