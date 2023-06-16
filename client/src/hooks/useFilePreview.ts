import { isValidURL } from '@/helpers/validateurl';
import { useEffect, useState } from 'react';

export default function useFilePreview(
  file: FileList | null | string | undefined
) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    console.log('rendering', file, imgSrc);
    if (file && file[0]) {
      try {
        const newUrl = URL.createObjectURL(file[0] as File);

        if (newUrl !== imgSrc) {
          setImgSrc(newUrl);
        }
      } catch (err) {
        if (isValidURL(file as string)) {
          setImgSrc(file as string);
        } else {
          setImgSrc(null);
        }
      }
    } else {
      setImgSrc(null);
    }
  }, [file]);

  return [imgSrc, setImgSrc];
}
