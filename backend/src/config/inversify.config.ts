import { Container } from 'inversify';

import TYPES from '../common/constants/container-types';
import { DatabaseConnection } from '../database';
import { AuthController } from '../modules/auth/auth.controller';
import { AuthService } from '../modules/auth/auth.service';
import { AccessTokenStrategy } from '../modules/auth/strategies/access-token.strategy';
import { PostsController } from '../modules/posts/posts.controller';
import { PostsService } from '../modules/posts/posts.service';
import { UsersController } from '../modules/users/users.contoller';
import { UsersService } from '../modules/users/users.service';
import { S3Service } from '../providers/s3/s3.service';

export const container = new Container();

container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<UsersController>(TYPES.UsersController).to(UsersController);
container.bind<PostsController>(TYPES.PostsController).to(PostsController);

container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<UsersService>(TYPES.UsersService).to(UsersService);
container.bind<S3Service>(TYPES.S3Service).to(S3Service);
container.bind<PostsService>(TYPES.PostsService).to(PostsService);

container.bind<DatabaseConnection>(TYPES.DatabaseConnection).to(DatabaseConnection);
container.bind<AccessTokenStrategy>(TYPES.AccessTokenStrategy).to(AccessTokenStrategy);
