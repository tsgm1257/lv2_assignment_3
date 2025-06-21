import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let error: any = err;

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    error = err;
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
    error = err.keyValue;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
