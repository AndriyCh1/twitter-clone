import { Container } from 'inversify';

import TYPES from '../common/constants/container-types';
import { DatabaseConnection } from '../database';
import { AuthController } from '../modules/auth/auth.controller';
import { AuthService } from '../modules/auth/auth.service';
import { AccessTokenStrategy } from '../modules/auth/strategies/access-token.strategy';

export const container = new Container();

container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

container.bind<DatabaseConnection>(TYPES.DatabaseConnection).to(DatabaseConnection);
container.bind<AccessTokenStrategy>(TYPES.AccessTokenStrategy).to(AccessTokenStrategy);
