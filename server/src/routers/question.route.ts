import express from 'express';
import {
  createQuestionHandler,
  deleteQuestionHandler,
  getAllQuestionsHandler,
  getQuestionByIdHandler,
  updateQuestionHandler,
} from '../controllers/question.controller';
import { multerUpload } from '../utils/multer';
import { validate } from '../middlewares/validate';
import { createQuestionSchema } from '../schemas/question.schema';

const router = express.Router();

router.post(
  '/',
  multerUpload.single('file'),
  validate(createQuestionSchema),
  createQuestionHandler
);
router.get('/', getAllQuestionsHandler);
router.get('/:id', getQuestionByIdHandler);
router.patch(
  '/:id',
  multerUpload.single('file'),
  validate(createQuestionSchema),
  updateQuestionHandler
);
router.delete('/:id', deleteQuestionHandler);

export default router;
