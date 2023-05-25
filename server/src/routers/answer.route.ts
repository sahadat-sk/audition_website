import express from 'express';
import { multerUpload } from '../utils/multer';
import {
  createAnswerHandler,
  getAllAnswersHandler,
} from '../controllers/answer.controller';

const router = express.Router();

router.put('/:userid', multerUpload.single('file'), createAnswerHandler);
router.get('/:userid', getAllAnswersHandler);

export default router;
