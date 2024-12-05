import { injectable } from "inversify";
import { ITokenRepository } from "../interfaces/ITokenRepository";
import { RefreshTokenModel } from "../models/RefreshToken.model";

@injectable()
export class TokenRepository implements ITokenRepository {
  // Implement using your preferred storage (MongoDB, Redis, etc.)
  async saveRefreshToken(data: { userId: string, token: string }): Promise<void> {
    // Save refresh token to database
    // Example with MongoDB:
    await RefreshTokenModel.create(data);
  }

  async findRefreshToken(token: string): Promise<boolean> {
    const existingToken = await RefreshTokenModel.findOne({ token });
    return !!existingToken;
  }

  async deleteRefreshToken(token: string): Promise<void> {
    // console.log('inside logout repo')
    await RefreshTokenModel.findOneAndDelete({ token });
  }
}