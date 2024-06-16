import { Posts, useGetAllPosts, useGetFollowingPosts } from "../../posts";
import { FeedType } from "./home";

interface IProps {
  type: FeedType;
}

export const HomePosts = ({ type }: IProps) => {
  const allPostsResult = useGetAllPosts({ enabled: type === "for you" });

  const likedPostsResult = useGetFollowingPosts({
    enabled: type === "following",
  });

  const { isLoading, data } =
    type === "for you" ? allPostsResult : likedPostsResult;

  return <Posts posts={data || []} isLoading={isLoading} />;
};
