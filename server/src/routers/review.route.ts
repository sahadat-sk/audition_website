import express from 'express';
import { createReviewHandler } from '../controllers/review.controller';

const router = express.Router();

router.put('/:userid', createReviewHandler);

export default router;
