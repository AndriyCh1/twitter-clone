import { injectable } from 'inversify';

@injectable()
class AuthService {
  public async login() {}

  public async signup() {}

  public async logout() {}
}

export { AuthService };
