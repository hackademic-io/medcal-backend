import db from '../db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import tokenService from './token-service';
import UserDto from '../dtos/user-dto';
import ApiError from '../exeptions/api-error';
import { Request } from 'express';

class UserService {
  async buildUserRegistrationPayload(req: Request) {
    const { email, password, name, last_name, role } = req.body;

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

    return {
      email: email,
      password: hashPassword,
      name: name,
      last_name: last_name,
      role: role,
      activationlink: activationLink,
    };
  }

  async checkPassword(password: string, typedPassword: string) {
    const isPassEquals = await bcrypt.compare(password, typedPassword);

    if (!isPassEquals) {
      throw ApiError.BadRequest(`Incorrect password`);
    }

    return isPassEquals;
  }

  // Test route to check auth

  async getAllUsers() {
    const users = await db.query('SELECT * FROM users');
    return users;
  }
}

export default new UserService();
