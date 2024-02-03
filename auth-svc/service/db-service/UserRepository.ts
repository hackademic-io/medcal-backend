import { PrismaClient } from '@prisma/client';
import { IRegistrationPayloadProps } from '../../types/registration';

const prisma = new PrismaClient();

class UserRepository {
  async createUser(registrationPayload: IRegistrationPayloadProps) {
    const user = await prisma.users.create({
      data: registrationPayload,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    return user;
  }
}

export default new UserRepository();
