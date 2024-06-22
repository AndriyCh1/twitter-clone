import { useState } from "react";

import { BackButton, ProfilePosts, ProfileHeader } from ".";

import { ProfileHeaderSkeleton } from "../skeletons";
import { POSTS } from "../../../utils/db/dummy";
import { SwitchFeed } from "../../../components/common";
import { useAuthUser } from "../../auth";
import { useGetUserProfile } from "../../users";
import { useParams } from "react-router-dom";

const feedTypes = ["posts", "likes"] as const;

export type FeedType = (typeof feedTypes)[number];

export const Profile = () => {
  const [feedType, setFeedType] = useState<FeedType>("posts");
  const { data: authUser, isLoading: isAuthUserLoading } = useAuthUser();
  const { username } = useParams();

  const { data: user, isLoading: isUserLoading } = useGetUserProfile(
    username as string,
    { enabled: !!username }
  );

  if (!username) {
    return (
      <div className="flex-[4_4_0]  border-r border-gray-700 min-h-screen ">
        <p className="text-center text-lg mt-4">User not found</p>
      </div>
    );
  }

  if (isAuthUserLoading || isUserLoading) {
    return (
      <div className="flex-[4_4_0]  border-r border-gray-700 min-h-screen ">
        <ProfileHeaderSkeleton />
      </div>
    );
  }

  if (!authUser || !user) {
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
        <ProfilePosts
          type={feedType}
          userId={user._id}
          username={user.username}
        />
      </div>
    </div>
  );
};
