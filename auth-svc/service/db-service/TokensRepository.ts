import { PrismaClient, tokens } from '@prisma/client';

const prisma = new PrismaClient();

class TokensRepository {
  async findByUserId(user_id: number): Promise<tokens | null> {
    try {
      const tokenData = await prisma.tokens.findUnique({
        where: { user_id },
      });
      return tokenData;
    } catch (error) {
      console.error('Error finding token by user ID:', error);
      return null;
    }
  }

  async updateRefreshTokenBasedByUserId(
    user_id: number,
    refreshtoken: string
  ): Promise<tokens | null> {
    try {
      const newRefreshToken = await prisma.tokens.update({
        where: { user_id },
        data: { refreshtoken },
      });
      return newRefreshToken;
    } catch (error) {
      console.error('Error updating refresh token:', error);
      return null;
    }
  }

  async createToken(
    user_id: number,
    refreshtoken: string
  ): Promise<tokens | null> {
    try {
      const token = await prisma.tokens.create({
        data: {
          user_id,
          refreshtoken,
        },
      });
      return token;
    } catch (error) {
      console.error('Error creating token:', error);
      return null;
    }
  }

  async deleteTokenByRefreshToken(refreshtoken: string): Promise<void> {
    try {
      await prisma.tokens.deleteMany({
        where: { refreshtoken },
      });
    } catch (error) {
      console.error('Error deleting token by refresh token:', error);
    }
  }

  async findTokenByRefreshToken(refreshtoken: string): Promise<tokens | null> {
    try {
      const tokenData = await prisma.tokens.findFirst({
        where: { refreshtoken },
      });
      return tokenData;
    } catch (error) {
      console.error('Error finding token by refresh token:', error);
      return null;
    }
  }
}

export default new TokensRepository();
