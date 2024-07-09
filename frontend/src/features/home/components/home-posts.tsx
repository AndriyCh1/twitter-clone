import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingSpinner, ScrollToTop } from "../../../components/ui";
import {
  Posts,
  useInfiniteAllPosts,
  useInfiniteFollowingPosts,
  IPost,
} from "../../posts";
import { FeedType } from "./home";

interface IProps {
  type: FeedType;
}

export const HomePosts = ({ type }: IProps) => {
  const allPostsResult = useInfiniteAllPosts({ enabled: type === "for you" });
  const followingPostsResult = useInfiniteFollowingPosts({
    enabled: type === "following",
  });

  const {
    data: response,
    isLoading,
    fetchNextPage,
  } = type === "for you" ? allPostsResult : followingPostsResult;

  const posts =
    response?.pages.reduce((acc: IPost[], page) => acc.concat(page.data), []) ??
    [];

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
