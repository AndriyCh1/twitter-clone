import { injectable } from 'inversify';

import { Notification } from '../../common/models';

@injectable()
export class NotificationsService {
  public async getNotifications(userId: string) {
    const notifications = await Notification.find({ to: userId }).populate({ path: 'from', select: { password: 0 } });
    await Notification.updateMany({ to: userId }, { read: true });
    return notifications || [];
  }

  public async deleteNotifications(userId: string) {
    await Notification.deleteMany({ to: userId });
    return { message: 'Notifications deleted successfully' };
  }

  public async deleteNotification(notificationId: string, userId: string) {
    const notification = await Notification.findOne({ _id: notificationId, to: userId });
    if (!notification) throw new Error('Notification not found');

    await Notification.deleteOne({ _id: notificationId, to: userId });
    return { message: 'Notification deleted successfully' };
  }
}
