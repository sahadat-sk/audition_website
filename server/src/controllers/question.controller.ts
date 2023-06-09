import { Request, Response, NextFunction } from 'express';
import {
  createQuestion,
  deleteQuestion,
  findAllQuestions,
  findQuestionById,
  updateQuestion,
} from '../services/question.service';

export const createQuestionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const localFilePath = req.file?.path || '';
    const { text, type, options } = req.body;

    const result = await createQuestion({ text, type, options }, localFilePath);

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
    res.status(200).json({
      status: 'success',
      result: questions.length,
      data: { questions },
    });
  } catch (err) {
    next(err);
  }
};

export const getQuestionByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questionId = req.params.id;
    const question = await findQuestionById(questionId);
    res.status(200).json({ status: 'success', data: { question } });
  } catch (err) {
    next(err);
  }
};

export const updateQuestionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questionId = req.params.id;
    const localFilePath = req.file?.path || '';
    const { text, type, options } = req.body;

    const question = await updateQuestion(
      questionId,
      {
        text,
        type,
        options,
      },
      localFilePath
    );

    res.status(200).json({ status: 'success', data: { question } });
  } catch (err) {
    next(err);
  }
};

export const deleteQuestionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questionId = req.params.id;
    await deleteQuestion(questionId);
    res.status(200).json({ status: 'success', data: null });
  } catch (err) {
    next(err);
  }
};
