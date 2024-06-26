import { useQuery } from "@tanstack/react-query";
import { usersKeys } from "./users-keys";
import { usersService } from "./users-service";

interface IQueryOptions {
  enabled?: boolean;
}

const defaultOptions = {
  enabled: true,
};

export const useGetUserProfile = (
  userId: string,
  username: string,
  options: IQueryOptions = defaultOptions
) => {
  return useQuery({
    queryKey: usersKeys.profile(userId),
    queryFn: () => usersService.getUserProfile(username),
    enabled: options.enabled,
  });
};
