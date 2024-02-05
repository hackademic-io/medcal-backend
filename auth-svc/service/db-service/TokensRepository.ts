import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TokensRepository {
  async findByUserId(user_id: number) {
    const tokenData = prisma.tokens.findUnique({
      where: { user_id },
    });

    return tokenData;
  }

  async updateRefreshTokenBasedByUserId(user_id: number, refreshtoken: string) {
    const newRefreshToken = await prisma.tokens.update({
      where: { user_id },
      data: { refreshtoken },
    });

    return newRefreshToken;
  }

  async createToken(user_id: number, refreshtoken: string) {
    const token = await prisma.tokens.create({
      data: {
        user_id,
        refreshtoken,
      },
    });

    return token;
  }

  async deleteTokenByRefreshToken(refreshtoken: string) {
    const tokenData = await prisma.tokens.deleteMany({
      where: { refreshtoken },
    });

    return tokenData;
  }

  async findTokenByRefreshToken(refreshtoken: string) {
    const tokenData = await prisma.tokens.findFirst({
      where: { refreshtoken },
    });

    return tokenData;
  }
}

export default new TokensRepository();
