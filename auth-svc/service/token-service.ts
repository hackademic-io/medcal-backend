import jwt from 'jsonwebtoken';
import db from '../db';
import { IUserProps } from '../types/user';

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
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, jwtRefreshSecret) as IUserProps;
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await db.query(
      'SELECT * FROM tokens WHERE user_id = $1',
      [userId]
    );

    if (tokenData.rows[0]) {
      const newRefreshToken = await db.query(
        'UPDATE tokens SET refreshToken = $1 WHERE user_id = $2',
        [refreshToken, userId]
      );
      return newRefreshToken;
    }
    const token = await db.query(
      'INSERT INTO tokens (user_id, refreshToken) values ($1,$2)',
      [userId, refreshToken]
    );
    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await db.query(
      'DELETE FROM tokens WHERE refreshToken = $1',
      [refreshToken]
    );
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await db.query(
      'SELECT * FROM tokens WHERE refreshToken = $1',
      [refreshToken]
    );
    return tokenData.rows[0];
  }
}

export default new TokenService();
