import { useInfiniteQuery } from "@tanstack/react-query";
import { postsKeys } from "./posts-keys";
import { postsService } from "./posts-service";

interface IGetPostsOptions {
  page?: number;
  pageSize?: number;
  enabled?: boolean;
}

export const useInfiniteLikedPosts = (
  userId: string,
  options: IGetPostsOptions = {}
) => {
  const { page, pageSize, enabled } = {
    page: 1,
    pageSize: 20,
    enabled: true,
    ...options,
  };
  return useInfiniteQuery({
    queryKey: [...postsKeys.likedPosts(userId), page, pageSize],
    queryFn: ({ pageParam = 1 }) =>
      postsService.getLikedPosts({ pageSize, page: pageParam, userId }),
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < lastPage.pagination.totalPages) {
        return allPages.length + 1;
      }
    },
    initialPageParam: 1,
    enabled,
  });
};
