import cookieParser from 'cookie-parser';
import cors from 'cors';
import { json, urlencoded } from 'express';
import { Application, NextFunction, Request, Response } from 'express';
import passport from 'passport';

import TYPES from '../common/constants/container-types';
import { env } from '../common/utils/env-config';
import { DatabaseConnection } from '../database';
import { AccessTokenStrategy } from '../modules/auth/strategies/access-token.strategy';
import { BaseException, InternalServerException } from './exception.config';
import { container } from './inversify.config';

export async function serverConfig(app: Application) {
  app.use(cookieParser());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(urlencoded({ extended: true }));
  app.use(json({ limit: '5mb' }));
  app.use(passport.initialize());

  const accessTokenStrategy = container.get<AccessTokenStrategy>(TYPES.AccessTokenStrategy);
  accessTokenStrategy.init();

  const database = container.get<DatabaseConnection>(TYPES.DatabaseConnection);
  await database.initConnection();
  database.setAutoReconnect();
}

export function serverErrorConfig(app: Application) {
  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (err && err instanceof BaseException) {
      return res.status(err.statusCode).json(err);
    }

    if (err) {
      return res.status(500).json(new InternalServerException(err.message));
    }

    next();
  });
}
