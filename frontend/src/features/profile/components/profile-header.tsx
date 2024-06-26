import { useRef, useState } from "react";
import { IProfileUser } from "../types";
import { CoverImage } from "./cover-image";
import { ProfileAvatar } from "./profile-avatar";
import { EditProfileModal, ProfileHeaderDetails } from ".";
import { useAuthUser } from "../../auth";
import { IUpdateUserPayload, useFollow, useUpdateProfile } from "../../users";
import { convertToBase64 } from "../../../utils/img-to-base64";

interface IProps {
  user: IProfileUser;
}
export const ProfileHeader = ({ user }: IProps) => {
  const { data: authUser } = useAuthUser();
  const { mutate: follow, isPending: isFollowPending } = useFollow();
  const { mutate: updatedProfile, isPending: isUpdateProfilePending } =
    useUpdateProfile();

  const [coverImg, setCoverImg] = useState<string | null>(null); // base64 string
  const [profileImg, setProfileImg] = useState<string | null>(null); // base64 string

  const coverImgFileRef = useRef<File | null>(null);
  const profileImgFileRef = useRef<File | null>(null);

  const isMyProfile = authUser?._id === user?._id;
  const isFollower = authUser?.following.includes(user?._id);

  const handleFollow = () => {
    follow(user._id);
  };

  const handleUpdateProfile = (data: IUpdateUserPayload) => {
    if (!authUser) return;
    updatedProfile({ ...data, id: authUser._id });
  };

  const handlePickCoverImg = (img: File) => {
    coverImgFileRef.current = img;
    convertToBase64(img, setCoverImg);
  };

  const handlePickProfileImg = (img: File) => {
    profileImgFileRef.current = img;
    convertToBase64(img, setProfileImg);
  };

  return (
    <>
      <div className="relative group/cover">
        <CoverImage
          enableEdit={isMyProfile}
          img={coverImg || user?.coverImg}
          onChange={handlePickCoverImg}
        />

        <div className="avatar absolute -bottom-16 left-4">
          <ProfileAvatar
            img={profileImg || user?.profileImg}
            enableEdit
            onChange={handlePickProfileImg}
          />
        </div>
      </div>
      <div className="flex justify-end px-4 mt-5">
        {isMyProfile && <EditProfileModal />}
        {!isMyProfile && (
          <button
            className="btn btn-outline rounded-full btn-sm"
            onClick={handleFollow}
          >
            {isFollowPending && "Loading..."}
            {!isFollowPending && isFollower && "Unfollow"}
            {!isFollowPending && !isFollower && "Follow"}
          </button>
        )}
        {(coverImg || profileImg) && (
          <button
            className="btn btn-primary rounded-full btn-sm text-white px-4 ml-2"
            onClick={() =>
              handleUpdateProfile({
                coverImg: coverImgFileRef?.current || undefined,
                profileImg: profileImgFileRef?.current || undefined,
              })
            }
          >
            {isUpdateProfilePending ? "Updating..." : "Update"}
          </button>
        )}
      </div>

      <ProfileHeaderDetails user={user} />
    </>
  );
};
