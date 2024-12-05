import { controller, httpPost, next, request, response } from 'inversify-express-utils';
import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { EmployerService } from '../services/employer.service';
import { AppError } from '../utils/error.util';

@controller('/employers') // Base route for the controller
export class EmployerController {
  constructor(
    @inject('EmployerService') private employerService: EmployerService // Inject EmployerService
  ) { }

  @httpPost('/signup') // POST /api/employers/signup
  private async signup(@request() req: Request, @response() res: Response, @next() next: NextFunction) {

    try {
      console.log('inside controller')
      console.log('Request Body:', req.body);
      console.log('Request Headers:', req.headers);
      const { companyName, email, password, companyWebsite, industry } = req.body;
      const newEmployer = await this.employerService.signup({
        companyName,
        email,
        password,
        companyWebsite,
        industry,
      });

      res.status(201).json({
        message: 'Employer registered successfully',
        employer: {
          id: newEmployer._id,
          companyName: newEmployer.companyName,
          email: newEmployer.email,
        },
      });
    } catch (err: any) {
      if (err.message === 'Employer with this email already exists') {
        next(new AppError(err.message, 409)); // Conflict error
      } else {
        next(err); // Pass other errors to the middleware
      }
    }
  }

  @httpPost('/signin')
  private async signin(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      console.log(req.body)
      const { email, password } = req.body;
      
      const { employer, accessToken, refreshToken } = await this.employerService.signin({
        email,
        password
      });

      res.cookie('accessToken', accessToken, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Use secure in production
        sameSite: 'strict', // Helps prevent CSRF attacks
        maxAge: 15 * 60 * 1000 // 15 minutes in milliseconds
      });

      // Set refresh token as an HTTP-only cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
      });

      res.status(200).json({
        message: 'Signin successful',
        employer: {
          id: employer._id,
          companyName: employer.companyName,
          email: employer.email
        },
        tokens: {
          accessToken,
          refreshToken
        }
      });
    } catch (err: any) {
      next(new AppError(err.message, err.status || 500));
    }
  }

  @httpPost('/refresh-token')
  private async refreshToken(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;
      
      const newAccessToken = await this.employerService.refreshToken(refreshToken);

      // Set new access token as a cookie
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 minutes
      });

      res.status(200).json({
        message: 'Token refreshed successfully'
      });
    } catch (err: any) {
      next(new AppError(err.message, err.status || 401));
    }
  }

  @httpPost('/logout')
  private async logout(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      // console.log('inside logout controller')
      const refreshToken = req.cookies.refreshToken;

      // Clear tokens from database
      await this.employerService.logout(refreshToken);

      // Clear cookies
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      res.status(200).json({
        message: 'Logged out successfully'
      });
    } catch (err: any) {
      next(new AppError(err.message, err.status || 500));
    }
  }
}
