import express from 'express';
import { getAllAnswersHandler } from '../controllers/answer.controller';
import { createReviewHandler } from '../controllers/review.controller';

const router = express.Router();

router.put('/:userid', createReviewHandler);
router.get('/:userid', getAllAnswersHandler);

export default router;
