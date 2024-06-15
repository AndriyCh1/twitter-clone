import { useRef } from "react";
import { MdEdit } from "react-icons/md";
import { Uploader } from "../../../components/ui";

interface IProps {
  enableEdit?: boolean;
  img?: string;
  onChange?: (img: string) => void;
}

export const CoverImage = ({ enableEdit = false, img, onChange }: IProps) => {
  const coverImgRef = useRef<HTMLInputElement | null>(null);

  const handleImgChange = (files: File[]) => {
    if (files.length) {
      const reader = new FileReader();
      reader.onload = () => onChange?.(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <>
      <img
        src={img || "/cover.png"}
        className="h-52 w-full object-cover"
        alt="cover image"
      />
      {enableEdit && (
        <Uploader accept="image/*" onUpload={handleImgChange}>
          <div
            className="absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200"
            onClick={() => coverImgRef.current?.click()}
          >
            <MdEdit className="w-5 h-5 text-white" />
          </div>
        </Uploader>
      )}
    </>
  );
};
