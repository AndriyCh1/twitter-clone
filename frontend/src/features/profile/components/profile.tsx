import { useState } from "react";

import {
  BackButton,
  FeedTypeSwitch,
  FeedType as ProfileFeedType,
  ProfileHeader,
} from ".";

import { Posts } from "../../posts";
import { ProfileHeaderSkeleton } from "../skeletons";
import { POSTS } from "../../../utils/db/dummy";
import { FeedType } from "../../feed";

export const Profile = () => {
  const [feedType, setFeedType] = useState<ProfileFeedType>("posts");

  const isLoading = false;

  const user = {
    _id: "1",
    fullName: "John Doe",
    username: "johndoe",
    profileImg: "/avatars/boy2.png",
    coverImg: "/cover.png",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    link: "https://youtube.com/@asaprogrammer_",
    following: ["1", "2", "3"],
    followers: ["1", "2", "3"],
  };

  return (
    <>
      <div className="flex-[4_4_0]  border-r border-gray-700 min-h-screen ">
        {isLoading && <ProfileHeaderSkeleton />}
        {!isLoading && !user && (
          <p className="text-center text-lg mt-4">User not found</p>
        )}
        <div className="flex flex-col">
          {!isLoading && user && (
            <>
              <BackButton user={user?.fullName} posts={POSTS?.length} />
              <ProfileHeader user={user} />
              <FeedTypeSwitch type={feedType} onChange={setFeedType} />
            </>
          )}
          <Posts feedType={FeedType.FOR_YOU} />
        </div>
      </div>
    </>
  );
};
