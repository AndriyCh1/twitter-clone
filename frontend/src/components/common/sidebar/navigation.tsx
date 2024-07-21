import { Link } from "react-router-dom";
import { routes } from "../../../app/consts";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiSolidBookmarks } from "react-icons/bi";
import { useAuthUser } from "../../../features/auth";

export const Navigation = () => {
  const { data: user } = useAuthUser();

  return (
    <ul className="flex flex-col gap-3 mt-4">
      <li className="flex justify-center md:justify-start">
        <Link
          to={routes.home.build()}
          className="flex gap-2 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
        >
          <MdHomeFilled className="w-7 h-7" />
          <span className="text-lg hidden md:block">Home</span>
        </Link>
      </li>
      <li className="flex justify-center md:justify-start">
        <Link
          to={routes.notifications.build()}
          className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
        >
          <IoNotifications className="w-6 h-6" />
          <span className="text-lg hidden md:block">Notifications</span>
        </Link>
      </li>

      {user && (
        <li className="flex justify-center md:justify-start">
          <Link
            to={routes.profile.build(user.username)}
            className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
          >
            <FaUser className="w-6 h-6" />
            <span className="text-lg hidden md:block">Profile</span>
          </Link>
        </li>
      )}

      <li className="flex justify-center md:justify-start">
        <Link
          to={routes.savedPosts.build()}
          className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
        >
          <BiSolidBookmarks className="w-6 h-6" />
          <span className="text-lg hidden md:block">Saved</span>
        </Link>
      </li>
    </ul>
  );
};
