import express from 'express';
import {
  loginHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerHandler,
} from '../controllers/auth.controller';
import { deserializeUser } from '../middlewares/deserializeUser';
import { requireUser } from '../middlewares/requireUser';
import { validate } from '../middlewares/validate';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';

const router = express.Router();

router.post('/register', validate(createUserSchema), registerHandler);

router.post('/login', validate(loginUserSchema), loginHandler);

router.get('/refresh', refreshAccessTokenHandler);

router.use(deserializeUser, requireUser);

router.post('/logout', logoutHandler);

export default router;
