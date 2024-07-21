import { useInfiniteQuery } from "@tanstack/react-query";
import { postsService } from "./posts-service";
import { postsKeys } from "./posts-keys";

interface IGetSavedPostsOptions {
  page?: number;
  pageSize?: number;
  enabled?: boolean;
}

export const useInfiniteSavedPosts = (options: IGetSavedPostsOptions = {}) => {
  const { page, pageSize, enabled } = {
    page: 1,
    pageSize: 20,
    enabled: true,
    ...options,
  };

  return useInfiniteQuery({
    queryKey: [...postsKeys.savedPosts(), page, pageSize],
    queryFn: ({ pageParam = 1 }) =>
      postsService.getSavedPosts({ pageSize, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < lastPage.pagination.totalPages) {
        return allPages.length + 1;
      }
    },
    initialPageParam: 1,
    enabled,
  });
};

/*
export const useInfiniteUserPosts = (
  username: string,
  options: IGetPostsOptions = {}
) => {
  const { page, pageSize, enabled } = {
    page: 1,
    pageSize: 20,
    enabled: true,
    ...options,
  };
  return useInfiniteQuery({
    queryKey: [...postsKeys.userPosts(username), page, pageSize],
    queryFn: ({ pageParam = 1 }) =>
      postsService.getUserPosts({ pageSize, page: pageParam, username }),
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < lastPage.pagination.totalPages) {
        return allPages.length + 1;
      }
    },
    initialPageParam: 1,
    enabled,
  });
};
*/
