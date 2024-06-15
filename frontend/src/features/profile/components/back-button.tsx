import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IProps {
  user: string;
  posts?: number;
}
export const BackButton = ({ user, posts }: IProps) => {
  return (
    <div className="flex gap-10 px-4 py-2 items-center">
      <Link to="/">
        <FaArrowLeft className="w-4 h-4" />
      </Link>
      <div className="flex flex-col">
        <p className="font-bold text-lg">{user}</p>
        {posts && <span className="text-sm text-slate-500">{posts} posts</span>}
      </div>
    </div>
  );
};
