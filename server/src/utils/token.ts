import jwt from 'jsonwebtoken';

export class TokenUtils {
  static generateAccessToken(userId: string): string {
    return jwt.sign(
      { userId }, 
      process.env.ACCESS_TOKEN_SECRET!, 
      { expiresIn: '15m' }
    );
  }

  static generateRefreshToken(userId: string): string {
    return jwt.sign(
      { userId }, 
      process.env.REFRESH_TOKEN_SECRET!, 
      { expiresIn: '7d' }
    );
  }

  static verifyRefreshToken(token: string): { userId: string } {
    try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as { userId: string };
    } catch (err) {
      const error = new Error('Invalid refresh token');
      (error as any).status = 401;
      throw error;
    }
  }

  static verifyAccessToken(token: string): { userId: string } {
    try {
      return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: string };
    } catch (err) {
      const error = new Error('Invalid access token');
      (error as any).status = 401;
      throw error;
    }
  }
}