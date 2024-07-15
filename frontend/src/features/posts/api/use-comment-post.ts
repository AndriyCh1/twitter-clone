import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICommentPostPayload } from "../types";
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes(postsKeys.posts()[0]);
        },
      });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
