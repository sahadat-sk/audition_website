import useFilePreview from '@/hooks/useFilePreview';
import { X } from 'lucide-react';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import { UseFormReset } from 'react-hook-form';

type FilePreviewProps = {
  file: FileList | null | string;
  reset: UseFormReset<any>;
  fileImageSrc?: string;
  // setImageSrc: (src: string) => void;
};

function FilePreview({ file, reset, fileImageSrc }: FilePreviewProps) {
  const [filePreview] = useFilePreview(file);
  const [fileImagePreview, setFileImagePreview]: [
    string,
    Dispatch<SetStateAction<string | null>>
  ] = useFilePreview(fileImageSrc) as [
    string,
    Dispatch<SetStateAction<string | null>>
  ];
  return (
    <>
      {filePreview ? (
        <div className="flex items-center justify-between w-full gap-2">
          <Image
            src={filePreview as string}
            alt="file preview"
            className="w-full"
            height={480}
            width={640}
          />
          <button
            type="button"
            onClick={() => {
              reset({ file: null });
              console.log('hewo');
            }}
          >
            <X></X>
          </button>
        </div>
      ) : null}
      {fileImagePreview ? (
        <div className="flex items-center justify-between w-full gap-2">
          <Image
            src={fileImagePreview as string}
            alt="file preview"
            className="w-full"
            height={480}
            width={640}
          />
          <button
            type="button"
            onClick={() => {
              reset({ file: null });
              setFileImagePreview(null);
            }}
          >
            <X></X>
          </button>
        </div>
      ) : null}
    </>
  );
}

export default FilePreview;
