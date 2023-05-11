import express from 'express';
import {
  createQuestionHandler,
  getAllQuestionsHandler,
  getQuestionByIdHandler,
  updateQuestionHandler,
} from '../controllers/question.controller';
import { multerUpload } from '../utils/multer';

const router = express.Router();

router.post('/', multerUpload.single('file'), createQuestionHandler);
router.get('/', getAllQuestionsHandler);
router.get('/:id', getQuestionByIdHandler);
router.patch('/:id', multerUpload.single('file'), updateQuestionHandler);

export default router;
