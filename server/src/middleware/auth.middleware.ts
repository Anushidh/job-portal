// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { TokenUtils } from '../utils/token';
import { AppError } from '../utils/error.util';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];

  const accessToken = req.cookies.accessToken;

  if (accessToken == null) {
    return next(new AppError('No token provided', 401));
  }

  try {
    const decoded = TokenUtils.verifyAccessToken(accessToken);
    (req as any).user = decoded;
    next();
  } catch (error) {
    next(new AppError('Invalid or expired token', 403));
  }
}