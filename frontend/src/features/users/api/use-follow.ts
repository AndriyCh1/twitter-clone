import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "./users-service";
import { usersKeys } from "./users-keys";
import { authKeys } from "../../auth";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../utils/error-message";

export const useFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => usersService.follow(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.suggested() });
      queryClient.invalidateQueries({ queryKey: authKeys.authUser() });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
