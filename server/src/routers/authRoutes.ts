import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import authRouter from '../controllers/authControllers';
const router = express.Router();

router.get('/ping', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'pong' });
});
router.post('/signup', authRouter.signup);

export default router;
