export const postsKeys = {
  posts: () => ["posts"],
  likedPosts: (userId: string) => [...postsKeys.posts(), "liked-posts", userId],
  userPosts: (username: string) => [
    ...postsKeys.posts(),
    "user-posts",
    username,
  ],
  followingPosts: () => [...postsKeys.posts(), "following-posts"],
};
