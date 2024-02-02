const UserRepository = require('../service/db-service/UserRepository');
const userService = require('../service/user-service');
const mailService = require('../service/mail-service');
const tokenService = require('../service/token-service');
const ApiError = require('../exeptions/api-error');
const UserDto = require('../dtos/user-dto');

class UserController {
  async registration(req, res, next) {
    try {
      const { email } = req.body;
      const userExists = await UserRepository.findByEmail(email);

      if (userExists) {
        throw ApiError.BadRequest(`User with email ${email} already exists`);
      }

      const registrationPayload =
        await userService.buildUserRegistrationPayload(req.body);
      const user = await UserRepository.createUser(registrationPayload);

      console.log(user);

      await mailService.sendActivationMail(
        email,
        `${process.env.API_URL}/api/activate/${user.activationLink}`
      );

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

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
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

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users.rows);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
