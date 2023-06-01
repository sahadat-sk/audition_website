import useFilePreview from '@/hooks/useFilePreview';
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { UseFormReset } from 'react-hook-form';

type FilePreviewProps = {
  file: FileList | null | string;
  reset: UseFormReset<any>;
};

function FilePreview({ file, reset }: FilePreviewProps) {
  const [filePreview] = useFilePreview(file);
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
          <button type="button" onClick={() => reset({ file: null })}>
            <X></X>
          </button>
        </div>
      ) : null}
    </>
  );
}

export default FilePreview;
