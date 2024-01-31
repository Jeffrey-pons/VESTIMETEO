import { IManagementError } from './../utils/managementError.utils.js';
import { NextFunction, Request, Response} from 'express';

export const errorMiddleware = (
  error: IManagementError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  console.error(error);
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong';
  res.status(statusCode).json({ message });
};
