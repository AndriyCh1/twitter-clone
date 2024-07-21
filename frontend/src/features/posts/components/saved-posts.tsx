import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteSavedPosts } from "../api/use-infinite-saved-posts";
import { LoadingSpinner, ScrollToTop } from "../../../components/ui";
import { Posts } from "./posts";
import { IPost } from "../types";

export const SavedPosts = () => {
  const { data: response, isLoading, fetchNextPage } = useInfiniteSavedPosts();

  const posts =
    response?.pages.reduce((acc: IPost[], page) => acc.concat(page.data), []) ??
    [];

  return (
    <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
      {!posts.length && !isLoading && (
        <p className="text-center p-5">No saved posts</p>
      )}
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
    </div>
  );
};
