import { useEffect } from "react";
import {
  Posts,
  useInfiniteUserPosts,
  useInfiniteLikedPosts,
  IPost,
} from "../../posts";
import { usePostsCount } from "../context/posts-count-context";
import { FeedType } from "./profile";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingSpinner, ScrollToTop } from "../../../components/ui";

interface IProps {
  type: FeedType;
  userId: string;
  username: string;
}

export const ProfilePosts = ({ type, userId, username }: IProps) => {
  const { setPostsCount } = usePostsCount();

  const allPostsResult = useInfiniteUserPosts(username, {
    enabled: type === "posts",
  });

  const likedPostsResult = useInfiniteLikedPosts(userId, {
    enabled: type === "likes",
  });

  const {
    data: response,
    isLoading,
    fetchNextPage,
  } = type === "posts" ? allPostsResult : likedPostsResult;

  const posts =
    response?.pages.reduce((acc: IPost[], page) => acc.concat(page.data), []) ??
    [];

  useEffect(() => {
    setPostsCount(posts?.length || 0);
  }, [posts]);

  return (
    <>
      <InfiniteScroll
        dataLength={response?.pages?.length ?? 0}
        next={fetchNextPage}
        hasMore={
          response?.pages.length
            ? response?.pages[response?.pages.length - 1].pagination
                .totalPages >
              response?.pages[response?.pages.length - 1].pagination.currentPage
            : true
        }
        loader={<LoadingSpinner />}
      >
        <Posts posts={posts} isLoading={isLoading} />
      </InfiniteScroll>
      <ScrollToTop />
    </>
  );
};
