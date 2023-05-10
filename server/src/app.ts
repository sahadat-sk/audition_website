import cookieParser from 'cookie-parser';
import express, { NextFunction } from 'express';
import { Request, Response } from 'express-serve-static-core';
import createHttpError, { isHttpError } from 'http-errors';
import morgan from 'morgan';
import connectDB from './utils/connectDB';
import { ENVIRONMENT } from './utils/secrets';
import cors from 'cors';
import config from 'config';
import userRoutes from './routers/user.route';
import authRoutes from './routers/auth.route';
import sessionRoutes from './routers/session.route';
import questionRoutes from './routers/question.route';

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

if (ENVIRONMENT === 'development') {
  app.use(morgan('dev'));
}

app.use(
  cors({
    origin: config.get<string>('origin'),
    credentials: true,
  })
);

connectDB();

app.set('port', process.env.PORT || 5000);
app.set('env', process.env.NODE_ENV || 'development');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

app.use('/api/questions', questionRoutes);

app.get('/ping', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'pong' });
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, 'Not Found'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  let errorMessage = 'An Unknown error occurred!';
  let statusCode = 500;

  if (isHttpError(err)) {
    errorMessage = err.message;
    statusCode = err.statusCode;
  }
  res.status(statusCode).json({ message: errorMessage });
});

export default app;
