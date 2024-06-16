import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "./auth-service";
import { ILoginPayload } from "../types";
import { authKeys } from "./auth-keys";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ILoginPayload) => authService.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.auth() });
    },
  });
};
