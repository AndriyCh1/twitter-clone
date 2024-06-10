import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

import { BadRequestException, UnauthorizedException } from '../../config';
import { IUser } from '../models';
import { IUserRequest } from '../types/user-request';

interface IAuthConfig {
  optional?: boolean;
}

const initialConfig: IAuthConfig = { optional: false };

const auth =
  (config = initialConfig) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      passport.authenticate('access-jwt', { session: false }, (err: Error, decoded: IUser) => {
        if (err) {
          throw new BadRequestException(err.message);
        }

        if (!config.optional && !decoded) {
          throw new UnauthorizedException('Not authorized');
        }

        req.user = { id: decoded.id, email: decoded.email } as IUserRequest['user'];
        next();
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default auth;
