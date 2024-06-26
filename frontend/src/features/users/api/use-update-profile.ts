import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersKeys } from "./users-keys";
import { usersService } from "./users-service";
import { IUpdateUserPayload } from "../types";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../utils/error-message";
import { authKeys } from "../../auth";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: IUpdateUserPayload & { id: string }) =>
      usersService.updateUser(userData),
    onSuccess: (_, userData) => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.profile(userData.id),
      });
      queryClient.invalidateQueries({ queryKey: authKeys.authUser() });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
