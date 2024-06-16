import { useQuery } from "@tanstack/react-query";
import { postsKeys } from "./posts-keys";
import { postsService } from "./posts-service";

interface IQueryOptions {
  enabled?: boolean;
}

const defaultOptions = {
  enabled: true,
};

export const useGetFollowingPosts = (
  options: IQueryOptions = defaultOptions
) => {
  return useQuery({
    queryKey: postsKeys.followingPosts(),
    queryFn: () => postsService.getFollowingPosts(),
    enabled: options.enabled,
  });
};
