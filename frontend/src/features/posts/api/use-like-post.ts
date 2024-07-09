import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "./posts-service";
import { postsKeys } from "./posts-keys";
import { getErrorMessage } from "../../../utils/error-message";
import toast from "react-hot-toast";
import { IPaginatedResponse } from "../../../types";
import { IPost } from "../types";

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => postsService.likePost(postId),
    onSuccess: async (updatedLikes, postId: string) => {
      await queryClient.setQueriesData(
        { queryKey: postsKeys.posts() },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (oldData: any) => {
          const newCache = {
            ...oldData,
            pages: oldData?.pages?.map((page: IPaginatedResponse<IPost>) => ({
              ...page,
              data: page.data.map((post) =>
                post._id === postId ? { ...post, likes: updatedLikes } : post
              ),
            })),
          };

          return newCache;
        }
      );
    },
    onError: (e) => {
      toast.error(getErrorMessage(e));
    },
  });
};
