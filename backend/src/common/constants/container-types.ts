const TYPES = {
  AuthService: Symbol.for('AuthService'),
  AuthController: Symbol.for('AuthController'),
  DatabaseConnection: Symbol.for('DatabaseConnection'),
  AccessTokenStrategy: Symbol.for('AccessTokenStrategy'),
  UsersService: Symbol.for('UsersService'),
  UsersController: Symbol.for('UsersController'),
  S3Service: Symbol.for('S3Service'),
  PostsService: Symbol.for('PostsService'),
  PostsController: Symbol.for('PostsController'),
  NotificationsController: Symbol.for('NotificationsController'),
  NotificationsService: Symbol.for('NotificationsService'),
  HealthCheckController: Symbol.for('HealthCheckController'),
};

export default TYPES;
