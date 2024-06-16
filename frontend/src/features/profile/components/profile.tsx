import { useState } from "react";

import { BackButton, ProfilePosts, ProfileHeader } from ".";

import { ProfileHeaderSkeleton } from "../skeletons";
import { POSTS } from "../../../utils/db/dummy";
import { SwitchFeed } from "../../../components/common";
import { useAuthUser } from "../../auth";

const feedTypes = ["posts", "likes"] as const;

export type FeedType = (typeof feedTypes)[number];

export const Profile = () => {
  const [feedType, setFeedType] = useState<FeedType>("posts");
  const { data: user, isLoading } = useAuthUser();

  if (isLoading) {
    return (
      <div className="flex-[4_4_0]  border-r border-gray-700 min-h-screen ">
        <ProfileHeaderSkeleton />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex-[4_4_0]  border-r border-gray-700 min-h-screen ">
        <p className="text-center text-lg mt-4">User not found</p>
      </div>
    );
  }

  return (
    <div className="flex-[4_4_0]  border-r border-gray-700 min-h-screen ">
      <div className="flex flex-col">
        {/* // FIXME: */}
        <BackButton user={user?.fullName} posts={POSTS?.length} />
        <ProfileHeader user={user} />
        <SwitchFeed
          current={feedType}
          onChange={(type) => setFeedType(type as FeedType)}
          types={feedTypes}
        />
        <ProfilePosts type={feedType} userId={user._id} />
      </div>
    </div>
  );
};
