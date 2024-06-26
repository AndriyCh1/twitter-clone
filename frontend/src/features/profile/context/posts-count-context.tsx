import { PropsWithChildren, createContext, useContext, useState } from "react";

export interface IContextProps {
  postsCount: number | null;
  setPostsCount: (value: number | null) => void;
}

const PostsCountContext = createContext<IContextProps>({
  postsCount: 0,
  setPostsCount: () => null,
});

export const PostsCountProvider = ({ children }: PropsWithChildren) => {
  const [postsCount, setPostsCount] = useState<number | null>(0);

  return (
    <PostsCountContext.Provider value={{ postsCount, setPostsCount }}>
      {children}
    </PostsCountContext.Provider>
  );
};

export const usePostsCount = () => {
  const context = useContext(PostsCountContext);

  if (!context) {
    throw new Error("usePostsCount must be used within a PostsCountProvider");
  }

  return context;
};
