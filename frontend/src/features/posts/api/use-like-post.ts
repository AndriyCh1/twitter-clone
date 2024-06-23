import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "./posts-service";
import { postsKeys } from "./posts-keys";
import { getErrorMessage } from "../../../utils/error-message";
import toast from "react-hot-toast";
import { IPost } from "../types";

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => postsService.likePost(postId),
    onSuccess: (updatedLikes, postId) => {
      queryClient.setQueryData(postsKeys.posts(), (cache: IPost[]) => {
        return cache?.map((post) => {
          if (post._id === postId) {
            return { ...post, likes: updatedLikes };
          }
          return post;
        });
      });
    },
    onError: (e) => {
      toast.error(getErrorMessage(e));
    },
  });
};
