import { MdEdit } from "react-icons/md";
import { Uploader } from "../../../components/ui";

interface IProps {
  enableEdit?: boolean;
  img?: string;
  onChange?: (img: string) => void;
}

export const ProfileAvatar = ({
  img,
  enableEdit = false,
  onChange,
}: IProps) => {
  const handleUpload = (files: File[]) => {
    if (files.length) {
      const reader = new FileReader();
      reader.onload = () => onChange?.(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <div className="w-32 rounded-full relative group/avatar">
      <img src={img || "/avatar-placeholder.png"} />
      {enableEdit && (
        <Uploader accept="image/*" onUpload={handleUpload}>
          <div className="absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer">
            <MdEdit className="w-4 h-4 text-white" />
          </div>
        </Uploader>
      )}
    </div>
  );
};
