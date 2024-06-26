import { useEffect } from "react";
import { Posts, useGetLikedPosts, useGetUserPosts } from "../../posts";
import { usePostsCount } from "../context/posts-count-context";
import { FeedType } from "./profile";

interface IProps {
  type: FeedType;
  userId: string;
  username: string;
}

export const ProfilePosts = ({ type, userId, username }: IProps) => {
  const { setPostsCount } = usePostsCount();

  const allPostsResult = useGetUserPosts(username, {
    enabled: type === "posts",
  });
  const likedPostsResult = useGetLikedPosts(userId, {
    enabled: type === "likes",
  });

  const { isLoading, data } =
    type === "posts" ? allPostsResult : likedPostsResult;

  useEffect(() => {
    setPostsCount(data?.length || 0);
  }, [data]);

  return <Posts posts={data || []} isLoading={isLoading} />;
};
