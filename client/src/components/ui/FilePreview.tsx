import useFilePreview from '@/hooks/useFilePreview';
import { X } from 'lucide-react';
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
          <img
            src={filePreview as string}
            alt="file preview"
            className="w-full"
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
