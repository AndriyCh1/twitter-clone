import { Link } from "react-router-dom";
import { XSvg } from "../../icons";
import { BiLogOut } from "react-icons/bi";
import { routes } from "../../../app/consts";
import { MouseEvent } from "react";
import { useAuthUser, useLogout } from "../../../features/auth";
import { Navigation } from "./navigation";

export const Sidebar = () => {
  const { mutate: mutateLogout } = useLogout();
  const { data: user } = useAuthUser();

  const handleLogout = (e: MouseEvent<SVGElement>) => {
    e.preventDefault();
    mutateLogout();
  };

  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52">
      <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full">
        <Link
          to={routes.home.build()}
          className="flex justify-center md:justify-start"
        >
          <XSvg className="px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900" />
        </Link>
        <Navigation />
        {user && (
          <Link
            to={routes.profile.build(user.username)}
            className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
          >
            <div className="avatar hidden md:inline-flex">
              <div className="w-8 rounded-full">
                <img src={user?.profileImg || "/avatar-placeholder.png"} />
              </div>
            </div>
            <div className="flex justify-between flex-1">
              <div className="hidden md:block">
                <p className="text-white font-bold text-sm w-20 truncate">
                  {user?.fullName}
                </p>
                <p className="text-slate-500 text-sm">@{user?.username}</p>
              </div>
              <BiLogOut
                className="w-5 h-5 cursor-pointer"
                onClick={handleLogout}
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
