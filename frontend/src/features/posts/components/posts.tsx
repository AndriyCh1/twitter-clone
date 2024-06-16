import { Post } from "./post";
import { PostsSkeleton } from "../skeletons";
import { IPost } from "../types/post";

interface IProps {
  posts: IPost[];
  isLoading?: boolean;
}

export const Posts = ({ isLoading = false, posts }: IProps) => {
  return (
    <>
      {isLoading && (
        <div className="flex flex-col justify-center">
          <PostsSkeleton />
        </div>
      )}
      {!isLoading && posts?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading && posts && (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
