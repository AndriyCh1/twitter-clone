import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { usePostsCount } from "../context/posts-count-context";

interface IProps {
  user: string;
  posts?: number;
}
export const BackButton = ({ user }: IProps) => {
  const { postsCount } = usePostsCount();

  return (
    <div className="flex gap-10 px-4 py-2 items-center">
      <Link to="/">
        <FaArrowLeft className="w-4 h-4" />
      </Link>
      <div className="flex flex-col">
        <p className="font-bold text-lg">{user}</p>
        <span className="text-sm text-slate-500">
          {postsCount || "No"} posts
        </span>
      </div>
    </div>
  );
};
