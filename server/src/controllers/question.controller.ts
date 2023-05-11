import { Request, Response, NextFunction } from 'express';
import { createQuestion } from '../services/question.service';

export const uploadQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const localFilePath = req.file?.path || '';
    const { text, isSingleSelect, options } = req.body;

    const result = await createQuestion(
      { text, isSingleSelect, options },
      localFilePath
    );
    console.log(result);

    res.status(200).json({ status: 'success', data: { result } });
  } catch (err) {
    next(err);
  }
};
