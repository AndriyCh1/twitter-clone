import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { FormEvent, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Uploader } from "../../../components/ui";
import { useCreatePost } from "../api/use-create-post";
import { useAuthUser } from "../../auth";
import { getErrorMessage } from "../../../utils/error-message";

export const CreatePost = () => {
  const [text, setText] = useState("");
  const [encodedImg, setEncodedImg] = useState<string>();
  const [imgFile, setImgFile] = useState<File>();

  const { data: user } = useAuthUser();

  const {
    mutate: createPost,
    isPending: isPosting,
    isError,
    error: postError,
  } = useCreatePost();

  const clearForm = () => {
    setText("");
    setEncodedImg("");
    setImgFile(undefined);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text || imgFile) {
      createPost({ text, img: imgFile });
      clearForm();
    }
  };

  const handleImgUpload = (files: File[]) => {
    if (files.length) {
      setImgFile(files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => setEncodedImg(reader.result as string); // base-64 encoded img
    }
  };

  return (
    <div className="flex p-4 items-start gap-4 border-b border-gray-700">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img src={user?.profileImg || "/avatar-placeholder.png"} />
        </div>
      </div>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        <textarea
          className="textarea w-full p-0 text-lg resize-none border-none focus:outline-none  border-gray-800"
          placeholder="What is happening?!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {encodedImg && (
          <div className="relative  mx-auto">
            <IoCloseSharp
              className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
              onClick={() => setEncodedImg(undefined)}
            />
            <img
              src={encodedImg}
              className="w-full mx-auto h-72 object-contain rounded"
            />
          </div>
        )}

        <div className="flex justify-between border-t py-2 border-t-gray-700">
          <div className="flex gap-1 items-center">
            <Uploader accept="image/*" onUpload={handleImgUpload}>
              <CiImageOn className="fill-primary w-6 h-6 cursor-pointer" />
            </Uploader>
            <BsEmojiSmileFill className="fill-primary w-5 h-5 cursor-pointer" />
          </div>

          <button
            className="btn btn-primary rounded-full btn-sm text-white px-4"
            disabled={isPosting || (!text && !encodedImg)}
          >
            {isPosting ? "Posting..." : "Post"}
          </button>
        </div>
        {isError && (
          <div className="text-red-500">{getErrorMessage(postError)}</div>
        )}
      </form>
    </div>
  );
};
