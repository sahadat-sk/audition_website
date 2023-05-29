import { isValidURL } from '@/helpers/validateurl';
import { useEffect, useState } from 'react';

export default function useFilePreview(file: FileList | null | string) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (file && file[0]) {
        const newUrl = URL.createObjectURL(file[0] as File);

        if (newUrl !== imgSrc) {
          setImgSrc(newUrl);
        }
      } else if (isValidURL(file as string)) {
        setImgSrc(file as string);
      } else {
        setImgSrc(null);
      }
    } catch (err) {
      console.log(err);
      setImgSrc(null);
    }
  }, [file, imgSrc]);

  return [imgSrc, setImgSrc];
}
