const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class UserRepository {
  async createUser(registrationPayload) {
    const user = await prisma.users.create({
      data: registrationPayload,
    });

    return user;
  }

  async findByEmail(email) {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    return user;
  }
}

module.exports = new UserRepository();
