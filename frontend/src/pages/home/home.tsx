import { useState } from "react";
import { CreatePost, Posts } from "../../features/posts";
import { FeedType, SwitchFeedType } from "../../features/feed";

export const HomePage = () => {
  const [feedType, setFeedType] = useState(FeedType.FOR_YOU);

  return (
    <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
      <SwitchFeedType onChange={setFeedType} current={feedType} />
      <CreatePost />
      <Posts feedType={feedType} />
    </div>
  );
};
