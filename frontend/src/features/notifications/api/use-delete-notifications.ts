import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsKeys } from "./notifications-keys";
import { notificationsService } from "./notifications-service";

export const useDeleteNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: notificationsKeys.notifications(),
    mutationFn: () => notificationsService.deleteNotifications(),
    onSuccess: () => {
      queryClient.setQueryData(notificationsKeys.notifications(), () => []);
    },
  });
};
