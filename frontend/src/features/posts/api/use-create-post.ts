import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "./posts-service";
import { IPostCreatePayload } from "../types";
import { postsKeys } from "./posts-keys";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IPostCreatePayload) => postsService.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.posts() });
    },
  });
};
