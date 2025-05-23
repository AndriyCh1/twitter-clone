import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { IPost } from "../types";
import { useAuthUser } from "../../auth";
import {
  useCommentPost,
  useDeletePost,
  useLikePost,
  useSavePost,
} from "../api";
import { LoadingSpinner } from "../../../components/ui";
import { getErrorMessage } from "../../../utils/error-message";
import { hoursAgoOrDate } from "../../../utils/format-date";
import { cn } from "../../../utils/cn";

interface IProps {
  post: IPost;
}

export const Post = ({ post }: IProps) => {
  const { data: authUser } = useAuthUser();
  const {
    mutate: deletePostMutate,
    isPending: isDeleting,
    error: deleteError,
  } = useDeletePost();

  const { mutate: likePost, isPending: isLiking } = useLikePost();
  const { mutate: commentPost, isPending: isCommenting } = useCommentPost();
  const { mutate: savePost } = useSavePost();

  useEffect(() => {
    if (deleteError) {
      toast.error(getErrorMessage(deleteError));
    }
  }, [deleteError]);

  const [comment, setComment] = useState("");
  const postOwner = post.user;
  const isLiked = post.likes.includes(authUser?._id || "");

  const isMyPost = authUser?._id === postOwner._id;

  const handleDeletePost = () => {
    deletePostMutate(post._id);
  };

  const handlePostComment = (e: FormEvent) => {
    e.preventDefault();
    if (isCommenting) return;
    commentPost({ postId: post._id, text: comment });
    setComment("");
  };

  const handleLikePost = () => {
    likePost(post._id);
  };

  const handleSavePost = () => {
    savePost(post._id);
  };

  const getFormattedDate = () => {
    const createdAt = new Date(post.createdAt);
    const updatedAt = new Date(post.updatedAt);

    const relativeTime = hoursAgoOrDate(createdAt);

    return createdAt.toDateString() === updatedAt.toDateString()
      ? relativeTime
      : `${relativeTime} · edited`;
  };

  return (
    <>
      <div className="flex gap-2 items-start p-4 border-b border-gray-700">
        <div className="avatar">
          <Link
            to={`/profile/${postOwner.username}`}
            className="w-8 h-8 rounded-full overflow-hidden"
          >
            <img src={postOwner.profileImg || "/avatar-placeholder.png"} />
          </Link>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${postOwner.username}`} className="font-bold">
              {postOwner.fullName}
            </Link>
            <span className="text-gray-400 flex gap-1 text-sm">
              <Link to={`/profile/${postOwner.username}`}>
                @{postOwner.username}
              </Link>
              <span>·</span>
              <span>{getFormattedDate()}</span>
            </span>
            {isMyPost && (
              <span className="flex justify-end flex-1">
                {!isDeleting && (
                  <FaTrash
                    className="cursor-pointer hover:text-red-500"
                    onClick={handleDeletePost}
                  />
                )}
                {isDeleting && <LoadingSpinner size="sm" />}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 overflow-hidden">
            <span>{post.text}</span>
            {post.img && (
              <img
                src={post.img}
                className="h-80 object-contain rounded-lg border border-gray-700"
              />
            )}
          </div>
          <div className="flex justify-between mt-3">
            <div className="flex gap-4 items-center w-2/3 justify-between">
              <div
                className="flex gap-1 items-center cursor-pointer group"
                // FIXME: Create custom modal
                onClick={() => {
                  const dialog = document.getElementById(
                    "comments_modal" + post._id
                  ) as HTMLDialogElement;
                  dialog.showModal();
                }}
              >
                <FaRegComment className="w-4 h-4  text-slate-500 group-hover:text-sky-400" />
                <span className="text-sm text-slate-500 group-hover:text-sky-400">
                  {post.comments.length}
                </span>
              </div>
              {/* We're using Modal Component from DaisyUI */}
              <dialog
                id={`comments_modal${post._id}`}
                className="modal border-none outline-none"
              >
                <div className="modal-box rounded border border-gray-600">
                  <h3 className="font-bold text-lg mb-4">COMMENTS</h3>
                  <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                    {post.comments.length === 0 && (
                      <p className="text-sm text-slate-500">
                        No comments yet 🤔 Be the first one 😉
                      </p>
                    )}
                    {post.comments.map((comment) => (
                      <div key={comment._id} className="flex gap-2 items-start">
                        <div className="avatar">
                          <div className="w-8 rounded-full">
                            <img
                              src={
                                comment.user.profileImg ||
                                "/avatar-placeholder.png"
                              }
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="font-bold">
                              {comment.user.fullName}
                            </span>
                            <span className="text-gray-700 text-sm">
                              @{comment.user.username}
                            </span>
                          </div>
                          <div className="text-sm">{comment.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form
                    className="flex gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                    onSubmit={handlePostComment}
                  >
                    <textarea
                      className="textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                      {isCommenting ? (
                        <span className="loading loading-spinner loading-md"></span>
                      ) : (
                        "Post"
                      )}
                    </button>
                  </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button className="outline-none">close</button>
                </form>
              </dialog>
              <div className="flex gap-1 items-center group cursor-pointer">
                <BiRepost className="w-6 h-6  text-slate-500 group-hover:text-green-500" />
                <span className="text-sm text-slate-500 group-hover:text-green-500">
                  0
                </span>
              </div>
              <button
                className="flex gap-1 items-center group cursor-pointer"
                disabled={isLiking}
                onClick={handleLikePost}
              >
                {(!isLiked || isLiking) && (
                  <FaRegHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
                )}
                {isLiked && !isLiking && (
                  <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-500 " />
                )}

                <span
                  className={`text-sm text-slate-500 group-hover:text-pink-500 ${
                    isLiked ? "text-pink-500" : ""
                  }`}
                >
                  {post.likes.length}
                </span>
              </button>
            </div>
            <div className="flex w-1/3 justify-end gap-2 items-center">
              <FaRegBookmark
                className={cn(
                  "w-4 h-4 text-slate-500 cursor-pointer",
                  post.isSaved && "text-sky-500"
                )}
                onClick={handleSavePost}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
