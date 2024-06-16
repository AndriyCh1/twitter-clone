import { useState } from "react";
import { SwitchFeed } from "../../../components/common";
import { CreatePost } from "../../posts";
import { HomePosts } from "./home-posts";

const feedTypes = ["for you", "following"] as const;
export type FeedType = (typeof feedTypes)[number];

export const Home = () => {
  const [feedType, setFeedType] = useState<FeedType>("for you");

  return (
    <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
      <SwitchFeed
        onChange={(type) => setFeedType(type as FeedType)}
        current={feedType}
        types={feedTypes}
      />
      <CreatePost />
      <HomePosts type={feedType} />
    </div>
  );
};
