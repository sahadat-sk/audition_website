import express, { NextFunction } from 'express';
import { Request, Response } from 'express-serve-static-core';
import createHttpError, { isHttpError } from 'http-errors';
import authRouter from './routers/authRoutes';
import connectDB from './utils/connectdb';
const app = express();

app.use(express.json());

connectDB();

app.set('port', process.env.PORT || 5000);
app.set('env', process.env.NODE_ENV || 'development');

app.use('/auth', authRouter);

app.get('/ping', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'pong' });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, 'Not Found'));
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
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
