import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICommentPostPayload, IPost } from "../types";
import { postsService } from "./posts-service";
import { postsKeys } from "./posts-keys";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../utils/error-message";

export const useCommentPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      ...data
    }: ICommentPostPayload & { postId: string }) =>
      postsService.commentPost(postId, data),
    onSuccess: (commentedPost, { postId }) => {
      // queryClient.invalidateQueries({ queryKey: postsKeys.posts() });
      queryClient.setQueryData(postsKeys.posts(), (cache: IPost[]) => {
        return cache?.map((post) => {
          if (post._id === postId) {
            return { ...post, comments: commentedPost.comments };
          }
          return post;
        });
      });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
