import { CreatePost, Posts } from "../../features/posts";

export const HomePage = () => {
  const feedType = "home";
  return (
    <>
      <CreatePost />
      <Posts feedType={feedType} />
    </>
  );
};
