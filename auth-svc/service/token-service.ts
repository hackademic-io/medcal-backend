import jwt from 'jsonwebtoken';
import { IUserProps } from '../types/user';
import TokensRepository from './db-service/TokensRepository';

const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET as string;
const jwtAccessSecret = process.env.JWT_ACCESS_SECRET as string;

class TokenService {
  generateTokens(payload: IUserProps) {
    const accessToken = jwt.sign(payload, jwtAccessSecret, {
      expiresIn: '15s',
    });
    const refreshToken = jwt.sign(payload, jwtRefreshSecret, {
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, jwtAccessSecret) as IUserProps;
      return userData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, jwtRefreshSecret) as IUserProps;
      return userData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await TokensRepository.findByUserId(userId);

    if (tokenData) {
      const newRefreshToken = TokensRepository.updateRefreshTokenBasedByUserId(
        userId,
        refreshToken
      );
      return newRefreshToken;
    }
    const token = TokensRepository.createToken(userId, refreshToken);
    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = TokensRepository.deleteTokenByRefreshToken(refreshToken);
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = TokensRepository.findTokenByRefreshToken(refreshToken);
    return tokenData;
  }
}

export default new TokenService();
