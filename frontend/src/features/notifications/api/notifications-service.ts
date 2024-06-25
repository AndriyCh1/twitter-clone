import { apiService } from "../../../app/api-service";
import {
  IGetNotificationsResponse,
  IDeleteNotificationResponse,
} from "../types";

class NotificationsService {
  public async getNotifications() {
    const res =
      await apiService.get<IGetNotificationsResponse>("/notifications");

    return res.data;
  }

  public async deleteNotifications() {
    const res =
      await apiService.delete<IDeleteNotificationResponse>("/notifications");

    return res.data;
  }
}

export const notificationsService = new NotificationsService();
