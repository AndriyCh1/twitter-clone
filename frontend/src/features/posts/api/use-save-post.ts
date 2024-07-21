import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "./posts-service";
import { postsKeys } from "./posts-keys";
import { getErrorMessage } from "../../../utils/error-message";
import toast from "react-hot-toast";

export const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postsService.saveUnsavePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes(postsKeys.posts()[0]);
        },
      });
    },
    onError: (e) => {
      toast.error(getErrorMessage(e));
    },
  });
};
