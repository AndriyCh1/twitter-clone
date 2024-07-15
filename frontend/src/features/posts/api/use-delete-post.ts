import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "./posts-service";
import { postsKeys } from "./posts-keys";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../utils/error-message";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postsService.deletePost(id),

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
