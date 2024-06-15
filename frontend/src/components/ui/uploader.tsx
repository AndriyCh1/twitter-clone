import { ChangeEvent, useCallback, useRef } from "react";

export interface IFileType {
  name?: string;
  fileKey?: number | string;
  blobFile?: File;
  status?: "inited" | "uploading" | "error" | "finished";
  progress?: number;
  url?: string;
}

export interface IProps {
  accept?: string;
  multiple?: boolean;
  onUpload?: (files: File[]) => void;
  onError?: (status: string, file: IFileType, event: ProgressEvent) => void;
  children?: React.ReactNode;
}

export const Uploader = ({
  children,
  accept = "*",
  multiple = false,
  onUpload,
}: IProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (files) {
        onUpload?.(Array.from(files)); // Array.from converts iterable FileList to an array
      }
    },
    [onUpload]
  );

  return (
    <div onClick={() => inputRef.current?.click()}>
      {children}
      <input
        type="file"
        hidden
        ref={inputRef}
        multiple={multiple}
        accept={accept}
        onChange={handleOnChange}
      />
    </div>
  );
};
