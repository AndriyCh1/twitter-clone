import { Post } from "./post";
import { PostsSkeleton } from "../skeletons";
import { POSTS } from "../../../utils/db/dummy";
import { FeedType } from "../../feed";

interface IProps {
  feedType: FeedType;
}

// TODO: Use feed type
export const Posts = ({ feedType }: IProps) => {
  const isLoading = false;
  console.log(feedType, "feedType");

  return (
    <>
      {isLoading && (
        <div className="flex flex-col justify-center">
          <PostsSkeleton />
        </div>
      )}
      {!isLoading && POSTS?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading && POSTS && (
        <div>
          {POSTS.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
