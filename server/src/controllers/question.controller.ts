import { Request, Response, NextFunction } from 'express';
import { uploadImage } from '../services/coudinary.service';

export const uploadQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const localFilePath = req.file?.path || '';

    console.log('file path', req.file);
    const result = await uploadImage(localFilePath);
    console.log(result);

    res.status(200).json({ status: 'success', data: { result } });
  } catch (err) {
    next(err);
  }
};
