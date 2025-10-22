/**
 * Express middleware for error handling
 * Demonstrates Copilot generating middleware patterns
 */

import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  status?: number;
}

/**
 * Error handling middleware
 */
export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: {
      status,
      message,
    },
  });
};

/**
 * Not found middleware
 */
export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error: ApiError = new Error('Not Found');
  error.status = 404;
  next(error);
};

/**
 * Request logging middleware
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(`${req.method} ${req.path}`);
  next();
};
