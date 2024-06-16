import { useQuery } from "@tanstack/react-query";
import { authKeys } from "./auth-keys";
import { authService } from "./auth-service";

export const useAuthUser = () => {
  return useQuery({
    queryKey: authKeys.auth(),
    queryFn: () => authService.getAuthUser(),
    retry: 1,
  });
};
