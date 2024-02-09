import { ValidationError, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../exeptions/api-error';

const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).array() as ValidationError[];
  if (errors.length !== 0) {
    return next(ApiError.BadRequest('Validation error', errors));
  }
  next();
};

export default validationMiddleware;
