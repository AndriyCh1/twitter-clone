import { useState } from "react";

import { BackButton, ProfilePosts, ProfileHeader } from ".";

import { SwitchFeed } from "../../../components/common";
import { useAuthUser } from "../../auth";
import { useGetUserProfile } from "../../users";
import { useParams } from "react-router-dom";
import { PostsCountProvider } from "../context/posts-count-context";
import { UserNotFound } from "./user-not-found";
import { ProfileHeaderSkeleton } from "../skeletons";

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

  if (isAuthUserLoading || isUserLoading) {
    return (
      <div className="flex-[4_4_0]  border-r border-gray-700 min-h-screen ">
        <ProfileHeaderSkeleton />
      </div>
    );
  }

  if (!username || !authUser || !user) {
    return <UserNotFound />;
  }

  return (
    <div className="flex-[4_4_0]  border-r border-gray-700 min-h-screen ">
      <PostsCountProvider>
        <div className="flex flex-col">
          <BackButton user={user?.fullName} />
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
      </PostsCountProvider>
    </div>
  );
};
