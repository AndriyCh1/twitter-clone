import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ISignUpPayload } from "../types";
import { authService } from "./auth-service";
import { authKeys } from "./auth-keys";

export const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ISignUpPayload) => authService.signup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.authUser() });
    },
  });
};
