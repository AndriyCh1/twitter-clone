import 'reflect-metadata';

import { InversifyExpressServer } from 'inversify-express-utils';

import { env } from './common/utils/env-config';
import { container, Logger, serverConfig, serverErrorConfig } from './config';

export async function bootstrap() {
  const server = new InversifyExpressServer(container);
  server.setConfig(serverConfig);
  server.setErrorConfig(serverErrorConfig);

  const app = server.build();
  app.listen(env.PORT, () => new Logger().info(`Server up on ${env.HOST}:${env.PORT}`));
}

bootstrap();
