import { Request, Response, NextFunction } from 'express';
import UserRepository from '../service/db-service/UserRepository';
import userService from '../service/user-service';
import mailService from '../service/mail-service';
import tokenService from '../service/token-service';
import ApiError from '../exeptions/api-error';
import UserDto from '../dtos/user-dto';

const clientUrl = process.env.CLIENT_URL as string;

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const userExists = await UserRepository.findByEmail(email);

      if (userExists) {
        throw ApiError.BadRequest(`User with email ${email} already exists`);
      }

      const registrationPayload =
        await userService.buildUserRegistrationPayload(req);
      const user = await UserRepository.createUser(registrationPayload);

      mailService.sendActivationMail(email, user.activationlink);

      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      const userData = {
        ...tokens,
        user: userDto,
      };

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserRepository.findByEmail(email);

      if (!user) {
        throw ApiError.BadRequest(`User with email ${email} is not found`);
      }

      await userService.checkPassword(password, user.password);

      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      const userData = {
        ...tokens,
        user: userDto,
      };

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await tokenService.removeToken(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(clientUrl);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies;
      const userData = await userService.refresh(refreshToken.refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users.rows);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
