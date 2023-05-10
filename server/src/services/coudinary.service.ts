import { v2 as cloudinary } from 'cloudinary';
import { unlinkSync } from 'fs';
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from '../utils/secrets';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: string) => {
  try {
    const cloudinaryImageUploadResponse = await cloudinary.uploader.upload(
      file,
      {
        public_id: CLOUDINARY_CLOUD_NAME,
      }
    );
    const { url } = cloudinaryImageUploadResponse;
    if (!url) {
      unlinkSync(file);
      throw new Error('Error uploading image to cloudinary');
    }
    // unlinkSync(file);
    return url;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    unlinkSync(file);
    throw new Error(err);
  }
};
