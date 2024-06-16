import { useQuery } from "@tanstack/react-query";
import { postsKeys } from "./posts-keys";
import { postsService } from "./posts-service";

interface IQueryOptions {
  enabled?: boolean;
}

const defaultOptions = {
  enabled: true,
};

export const useGetUserPosts = (
  username: string,
  options: IQueryOptions = defaultOptions
) => {
  return useQuery({
    queryKey: postsKeys.userPosts(username),
    queryFn: () => postsService.getUserPosts(username),
    enabled: options.enabled,
  });
};
