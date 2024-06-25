import { useQuery } from "@tanstack/react-query";
import { notificationsKeys } from "./notifications-keys";
import { notificationsService } from "./notifications-service";

export const useGetNotifications = () => {
  return useQuery({
    queryKey: notificationsKeys.notifications(),
    queryFn: () => notificationsService.getNotifications(),
  });
};
