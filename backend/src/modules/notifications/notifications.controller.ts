import { inject } from 'inversify';
import { BaseHttpController, controller, httpDelete, httpGet, request, requestParam } from 'inversify-express-utils';

import TYPES from '../../common/constants/container-types';
import auth from '../../common/middlewares/auth.middleware';
import { IUserRequest } from '../../common/types/user-request';
import { NotificationsService } from './notifications.service';

@controller('/notifications')
export class NotificationsController extends BaseHttpController {
  constructor(@inject(TYPES.NotificationsService) private readonly notificationsService: NotificationsService) {
    super();
  }

  @httpGet('/', auth())
  public async getNotifications(@request() req: IUserRequest) {
    return this.notificationsService.getNotifications(req.user.id);
  }

  @httpDelete('/', auth())
  public async deleteNotifications(@request() req: IUserRequest) {
    return this.notificationsService.deleteNotifications(req.user.id);
  }

  @httpDelete('/:id', auth())
  public async deleteNotification(@request() req: IUserRequest, @requestParam('id') notificationId: string) {
    return this.notificationsService.deleteNotification(notificationId, req.user.id);
  }
}
