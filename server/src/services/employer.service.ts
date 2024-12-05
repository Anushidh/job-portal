import { inject, injectable } from 'inversify';
import { IEmployerRepository } from '../interfaces/IEmployerRepository';
import { EmployerSigninInput, EmployerSigninSchema, EmployerSignupInput, EmployerSignupSchema } from '../schemas/employer.schema';
import bcrypt from 'bcryptjs';
import { IEmployer } from '../models/employer.model';
import { ITokenRepository } from '../interfaces/ITokenRepository';
import {TokenUtils} from '../utils/token'


@injectable()
export class EmployerService {
  constructor(
    @inject('EmployerRepository') private employerRepository: IEmployerRepository,
    @inject('TokenRepository') private tokenRepository: ITokenRepository
  ) {}

  async signup(employerData: EmployerSignupInput): Promise<IEmployer> {
    try {
      const validatedData = EmployerSignupSchema.parse(employerData);
    const existingEmployer = await this.employerRepository.findByEmail(employerData.email);
    if (existingEmployer) {
      const error = new Error('Employer with this email already exists');
      (error as any).status = 409; // Add status directly to the error
      throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employerData.password, salt);
    return this.employerRepository.create({
      ...employerData,
      password: hashedPassword,
    });
    } catch (err: any) {
       // Handle Zod validation errors
       if (err.name === 'ZodError') {
        const error = new Error('Invalid input data');
        (error as any).status = 400;
        throw error;
      }
      
      // Rethrow other errors with potential status
      throw err;
    }
  }

  async signin(credentials: EmployerSigninInput): Promise<{
    employer: IEmployer,
    accessToken: string,
    refreshToken: string
  }> {
    try {
      const validatedData = EmployerSigninSchema.parse(credentials);
      const { email, password } = credentials;

      // Find employer
      const employer = await this.employerRepository.findByEmail(email);
      if (!employer) {
        const error = new Error('Invalid credentials');
        (error as any).status = 401;
        throw error;
      }
      console.log(employer)
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, employer.password);
      console.log(isPasswordValid)
      if (!isPasswordValid) {
        const error = new Error('Invalid credentials');
        (error as any).status = 401;
        throw error;
      }

      // Generate tokens
      const accessToken = TokenUtils.generateAccessToken(employer._id as string);
      const refreshToken = TokenUtils.generateRefreshToken(employer._id as string);
      console.log(accessToken)
      console.log(refreshToken)
      // Store refresh token
      await this.tokenRepository.saveRefreshToken({
        userId: employer._id as string,
        token: refreshToken
      });

      return {
        employer,
        accessToken,
        refreshToken
      };
    } catch (err: any) {
      if (err.name === 'ZodError') {
        const error = new Error('Invalid input data');
        (error as any).status = 400;
        throw error;
      }
      throw err;
    }
  }

  async refreshToken(refreshToken: string): Promise<string> {
    try {
      // Verify refresh token
      const decoded = TokenUtils.verifyRefreshToken(refreshToken);
  
      // Check if token exists in repository
      const tokenExists = await this.tokenRepository.findRefreshToken(refreshToken);
      if (!tokenExists) {
        const error = new Error('Invalid refresh token');
        (error as any).status = 401;
        throw error;
      }
  
      // Generate new access token
      const newAccessToken = TokenUtils.generateAccessToken(decoded.userId);
  
      return newAccessToken;
    } catch (err: any) {
      throw err;
    }
  }
 
  async logout(refreshToken: string): Promise<void> {
    // console.log('inside logout service')
    await this.tokenRepository.deleteRefreshToken(refreshToken);
  }
 
}


