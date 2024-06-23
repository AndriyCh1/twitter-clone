import { Link } from "react-router-dom";
import { RightPanelSkeleton } from "../skeletons";
import { routes } from "../../app/consts";
import { useFollow, useGetSuggestedUsers } from "../../features/users";
import { LoadingSpinner } from "../ui";

export const RightPanel = () => {
  const { isLoading: isSuggestedUsersLoading, data: suggestedUsers } =
    useGetSuggestedUsers();
  const { mutate: follow, isPending: isFollowPending } = useFollow();

  if (suggestedUsers?.length === 0) {
    return <div className="md:w-64 w-0"></div>;
  }

  const handleFollowUser = (userId: string) => {
    follow(userId);
  };

  return (
    <div className="hidden lg:block my-4 mx-2">
      <div className="bg-[#16181C] p-4 rounded-md sticky top-2">
        <p className="font-bold">Who to follow</p>
        <div className="flex flex-col gap-4">
          {isSuggestedUsersLoading && <RightPanelSkeleton />}
          {!isSuggestedUsersLoading &&
            suggestedUsers?.map((user) => (
              <Link
                to={routes.profile.build(user.username)}
                className="flex items-center justify-between gap-4"
                key={user._id}
              >
                <div className="flex gap-2 items-center">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={user.profileImg || "/avatar-placeholder.png"} />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold tracking-tight truncate w-28">
                      {user.fullName}
                    </span>
                    <span className="text-sm text-slate-500">
                      @{user.username}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    className="btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFollowUser(user._id);
                    }}
                  >
                    {isFollowPending ? <LoadingSpinner size="xs" /> : "Follow"}
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
