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

  async findByActivationLink(activationlink: string) {
    const user = await prisma.users.findUnique({
      where: { activationlink },
    });

    return user;
  }

  async updateUserIsActivatedState(userId: number, value: boolean) {
    const user = await prisma.users.update({
      where: {
        user_id: userId,
      },
      data: {
        isactivated: value,
      },
    });
  }
}

export default new UserRepository();
