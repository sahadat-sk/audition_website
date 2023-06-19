import express from 'express';
import {
  getAllUsersHandler,
  getMeHandler,
} from '../controllers/user.controller';
import { deserializeUser } from '../middlewares/deserializeUser';
import { requireUser } from '../middlewares/requireUser';
import { restrictTo } from '../middlewares/restrictTo';

const router = express.Router();

router.use(deserializeUser, requireUser);

// router.get('/', restrictTo('admin'), getAllUsersHandler);
router.get('/me', getMeHandler);
router.get('/', getAllUsersHandler);

export default router;
