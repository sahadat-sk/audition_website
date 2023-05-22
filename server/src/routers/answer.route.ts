import express from 'express';
import {
  deleteQuestionHandler,
  getAllQuestionsHandler,
  getQuestionByIdHandler,
  updateQuestionHandler,
} from '../controllers/question.controller';
import { multerUpload } from '../utils/multer';
import { createAnswerHandler } from '../controllers/answer.controller';

const router = express.Router();

router.post('/', multerUpload.single('file'), createAnswerHandler);
router.get('/', getAllQuestionsHandler);
router.get('/:id', getQuestionByIdHandler);
router.patch('/:id', multerUpload.single('file'), updateQuestionHandler);
router.delete('/:id', deleteQuestionHandler);

export default router;
