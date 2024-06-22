import { Posts, useGetLikedPosts, useGetUserPosts } from "../../posts";
import { FeedType } from "./profile";

interface IProps {
  type: FeedType;
  userId: string;
  username: string;
}

export const ProfilePosts = ({ type, userId, username }: IProps) => {
  const allPostsResult = useGetUserPosts(username, {
    enabled: type === "posts",
  });
  const likedPostsResult = useGetLikedPosts(userId, {
    enabled: type === "likes",
  });

  const { isLoading, data } =
    type === "posts" ? allPostsResult : likedPostsResult;

  return <Posts posts={data || []} isLoading={isLoading} />;
};
