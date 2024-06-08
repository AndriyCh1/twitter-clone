import { json, urlencoded } from 'express';
import { Application, NextFunction, Request, Response } from 'express';

import TYPES from '../common/constants/container-types';
import { DatabaseConnection } from '../database';
import { BaseException, InternalServerException } from './exception.config';
import { container } from './inversify.config';

export async function serverConfig(app: Application) {
  app.use(urlencoded({ extended: true }));
  app.use(json());

  const database = container.get<DatabaseConnection>(TYPES.DatabaseConnection);
  await database.initConnection();
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
