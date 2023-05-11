import express from 'express';
import {
  createQuestionHandler,
  getAllQuestionsHandler,
} from '../controllers/question.controller';
import { multerUpload } from '../utils/multer';

const router = express.Router();

router.post('/', multerUpload.single('file'), createQuestionHandler);
router.get('/', getAllQuestionsHandler);

export default router;
