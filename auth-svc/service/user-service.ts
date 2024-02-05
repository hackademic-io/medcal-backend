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

  async activate(activationLink: string) {
    const user = await db.query(
      'SELECT * FROM users WHERE activationLink = $1',
      [activationLink]
    );

    if (!user.rows[0]) {
      throw ApiError.BadRequest('Activation link is incorrect');
    }

    await db.query('UPDATE users SET isActivated = $1 WHERE user_id = $2', [
      true,
      user.rows[0].user_id,
    ]);
  }

  async checkPassword(password: string, typedPassword: string) {
    const isPassEquals = await bcrypt.compare(password, typedPassword);

    if (!isPassEquals) {
      throw ApiError.BadRequest(`Incorrect password`);
    }

    return isPassEquals;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await db.query('SELECT * FROM users WHERE user_id = $1', [
      userData.id,
    ]);
    const userDto = new UserDto(user.rows[0]);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await db.query('SELECT * FROM users');
    return users;
  }
}

export default new UserService();
