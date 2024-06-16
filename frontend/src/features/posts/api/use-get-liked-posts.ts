import { useQuery } from "@tanstack/react-query";
import { postsKeys } from "./posts-keys";
import { postsService } from "./posts-service";

interface IQueryOptions {
  enabled?: boolean;
}

const defaultOptions = {
  enabled: true,
};

export const useGetLikedPosts = (
  userId: string,
  options: IQueryOptions = defaultOptions
) => {
  return useQuery({
    queryKey: postsKeys.likedPosts(userId),
    queryFn: () => postsService.getLikedPosts(userId),
    enabled: options.enabled,
    retry: 1,
  });
};
