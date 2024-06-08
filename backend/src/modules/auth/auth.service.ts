import { injectable } from 'inversify';

@injectable()
class AuthService {
  public async login() {
    return 'hello world';
  }
}

export { AuthService };
