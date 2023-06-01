import multer from 'multer';
import { randomUUID } from 'crypto';
const multerStorage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, __dirname);
  },

  filename: (request, file, callback) => {
    callback(null, randomUUID() + file.originalname.replaceAll(' ', '_'));
  },
});

export const multerUpload = multer({ storage: multerStorage });
