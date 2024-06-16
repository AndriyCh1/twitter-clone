import { Posts, useGetAllPosts, useGetLikedPosts } from "../../posts";
import { FeedType } from "./profile";

interface IProps {
  type: FeedType;
  userId: string;
}

export const ProfilePosts = ({ type, userId }: IProps) => {
  const allPostsResult = useGetAllPosts({
    enabled: type === "posts",
  });
  const likedPostsResult = useGetLikedPosts(userId, {
    enabled: type === "likes",
  });

  const { isLoading, data } =
    type === "posts" ? allPostsResult : likedPostsResult;

  return <Posts posts={data || []} isLoading={isLoading} />;
};
