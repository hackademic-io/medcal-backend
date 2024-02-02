const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class UserRepository {
  async createUser(registrationPayload) {
    const user = await prisma.users.create({
      data: {
        email: registrationPayload.email,
        password: registrationPayload.password,
        name: registrationPayload.name,
        last_name: registrationPayload.last_name,
        activationlink: registrationPayload.activationLink,
        role: registrationPayload.role,
      },
    });

    return user;
  }

  async findByEmail(email) {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }
}

module.exports = new UserRepository();
