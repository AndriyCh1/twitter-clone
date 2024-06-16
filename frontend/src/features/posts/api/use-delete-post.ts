import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "./posts-service";
import { postsKeys } from "./posts-keys";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postsService.deletePost(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.posts() });
    },
  });
};
