import { PrismaClient } from '@prisma/client';
import { IRegistrationPayloadProps } from '../../types/registration';

const prisma = new PrismaClient();

class UserRepository {
  async createUser(registrationPayload: IRegistrationPayloadProps) {
    try {
      const user = await prisma.users.create({
        data: registrationPayload,
      });
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Could not create user');
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await prisma.users.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Could not find user by email');
    }
  }

  async findById(user_id: number) {
    try {
      const user = await prisma.users.findUnique({
        where: { user_id },
      });
      return user;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new Error('Could not find user by ID');
    }
  }

  async findByActivationLink(activationlink: string) {
    try {
      const user = await prisma.users.findUnique({
        where: { activationlink },
      });
      return user;
    } catch (error) {
      console.error('Error finding user by activation link:', error);
      throw new Error('Could not find user by activation link');
    }
  }

  async updateUserIsActivatedState(userId: number, value: boolean) {
    try {
      const user = await prisma.users.update({
        where: {
          user_id: userId,
        },
        data: {
          isactivated: value,
        },
      });
      return user;
    } catch (error) {
      console.error('Error updating user activation state:', error);
      throw new Error('Could not update user activation state');
    }
  }
}

export default new UserRepository();
