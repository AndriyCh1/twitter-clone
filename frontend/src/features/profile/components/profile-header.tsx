import { useState } from "react";
import { IProfileUser } from "../types";
import { CoverImage } from "./cover-image";
import { ProfileAvatar } from "./profile-avatar";
import { EditProfileModal, ProfileHeaderDetails } from ".";

interface IProps {
  user: IProfileUser;
}
export const ProfileHeader = ({ user }: IProps) => {
  const [coverImg, setCoverImg] = useState<string | null>(null); // base64 string
  const [profileImg, setProfileImg] = useState<string | null>(null); // base64 string
  const isMyProfile = true;

  return (
    <>
      <div className="relative group/cover">
        <CoverImage
          enableEdit={isMyProfile}
          img={coverImg || user?.coverImg}
          onChange={(img) => setCoverImg(img)}
        />

        <div className="avatar absolute -bottom-16 left-4">
          <ProfileAvatar
            img={profileImg || user?.profileImg}
            enableEdit
            onChange={(img) => setProfileImg(img)}
          />
        </div>
      </div>
      <div className="flex justify-end px-4 mt-5">
        {isMyProfile && <EditProfileModal />}
        {!isMyProfile && (
          <button
            className="btn btn-outline rounded-full btn-sm"
            onClick={() => alert("Followed successfully")}
          >
            Follow
          </button>
        )}
        {(coverImg || profileImg) && (
          <button
            className="btn btn-primary rounded-full btn-sm text-white px-4 ml-2"
            onClick={() => alert("Profile updated successfully")}
          >
            Update
          </button>
        )}
      </div>

      <ProfileHeaderDetails user={user} />
    </>
  );
};
