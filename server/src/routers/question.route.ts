import express from 'express';
import { uploadQuestion } from '../controllers/question.controller';
import { multerUpload } from '../utils/multer';

const router = express.Router();

router.post('/', multerUpload.single('file'), uploadQuestion);

export default router;
