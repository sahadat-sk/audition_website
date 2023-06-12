import { Request, Response, NextFunction } from 'express';
import {
  createOrUpdateAnswer,
  getAllAnswersByUserId,
  getAnswerByQuestionAndUserId,
} from '../services/answer.service';
import { Ref } from '@typegoose/typegoose';
import { User } from '../models/user.model';
import { Question } from '../models/question.model';

export const createAnswerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const localFilePath = req.file?.path || '';
    const { text, selectedOptions, questionId } = req.body;
    const userId = req.params.userid as unknown as Ref<User>;

    const result = await createOrUpdateAnswer(
      { questionId, userId },
      { text, selectedOptions, userId, questionId },
      localFilePath
    );

    res.status(200).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

export const getAllAnswersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userid as unknown as Ref<User>;
    const result = await getAllAnswersByUserId(userId);

    res.status(200).json({ status: 'success', data: result });
  } catch (err: unknown) {
    next(err);
  }
};

export const getAnswerByQuestionAndUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userid as unknown as Ref<User>;
    const questionId = req.params.questionid as unknown as Ref<Question>;
    const result = await getAnswerByQuestionAndUserId(userId, questionId);

    res.status(200).json({ status: 'success', data: result });
  } catch (err: unknown) {
    next(err);
  }
};
