import { useQuery } from "@tanstack/react-query";
import { postsKeys } from "./posts-keys";
import { postsService } from "./posts-service";

interface IQueryOptions {
  enabled?: boolean;
}

const defaultOptions = {
  enabled: true,
};

export const useGetAllPosts = (options: IQueryOptions = defaultOptions) => {
  return useQuery({
    queryKey: postsKeys.posts(),
    queryFn: () => postsService.getAllPosts(),
    enabled: options.enabled,
    retry: 1,
  });
};
