import express from 'express';
import {
  createQuestionHandler,
  getAllQuestionsHandler,
  updateQuestionHandler,
} from '../controllers/question.controller';
import { multerUpload } from '../utils/multer';

const router = express.Router();

router.post('/', multerUpload.single('file'), createQuestionHandler);
router.get('/', getAllQuestionsHandler);
router.patch('/:id', multerUpload.single('file'), updateQuestionHandler);

export default router;
