import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "./auth-service";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../utils/error-message";
import { authKeys } from "./auth-keys";

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authService.logout(),
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
    onSuccess: () => {
      queryClient.setQueryData(authKeys.auth(), null);
    },
    retry: 0,
  });
};
