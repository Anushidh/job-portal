export interface ITokenRepository {
  saveRefreshToken(data: { userId: string, token: string }): Promise<void>;
  findRefreshToken(token: string): Promise<boolean>;
  deleteRefreshToken(token: string): Promise<void>;
}