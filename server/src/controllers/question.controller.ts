import { Request, Response, NextFunction } from 'express';
import { createQuestion, findAllQuestions } from '../services/question.service';

export const createQuestionHandler = async (
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

    res.status(200).json({ status: 'success', data: { result } });
  } catch (err) {
    next(err);
  }
};

export const getAllQuestionsHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questions = await findAllQuestions();
    res
      .status(200)
      .json({
        status: 'success',
        result: questions.length,
        data: { questions },
      });
  } catch (err) {
    next(err);
  }
};
