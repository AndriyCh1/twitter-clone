import { Request } from 'express';
import { injectable } from 'inversify';
import passport from 'passport';
import { Strategy, VerifiedCallback } from 'passport-jwt';

import { User } from '../../../common/models';
import { accessTokenConfig, JwtPayload } from '../../../config';

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

@injectable()
export class AccessTokenStrategy {
  constructor() {}

  public init() {
    passport.use(
      'access-jwt',
      new Strategy(
        { jwtFromRequest: cookieExtractor, secretOrKey: accessTokenConfig.secret },
        async (payload: JwtPayload, done: VerifiedCallback) => {
          const user = await User.findById(payload.sub);

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        }
      )
    );
  }
}
