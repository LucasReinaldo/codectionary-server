/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';

import { createConnection } from 'typeorm';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import statusMonitor from 'express-status-monitor';

import cors from 'cors';
import morgan from 'morgan';

import AppError from '@shared/errors/AppError';
import routes from './routes';
import trim from './middlewares/trim';

const startServer = async () => {
  await createConnection()
    .then(async () => {
      const app = express();

      app.use(statusMonitor());

      app.use(cors());
      app.use(express.json());
      app.use(trim);
      app.use(routes);
      app.use(morgan('dev'));

      app.get('/status', statusMonitor());

      app.use(
        (err: Error, request: Request, response: Response, _: NextFunction) => {
          if (err instanceof AppError) {
            const { statusCode, message } = err;

            return response.status(statusCode).json({
              status: 'error',
              message,
            });
          }

          console.log(err);

          return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
          });
        },
      );

      app.listen(5000, () => {
        console.log('🚀 Running at localhost:5000');
      });
    })
    .catch((error) => console.log(error));
};

startServer().catch((err: Error) => {
  console.log(err);
});
