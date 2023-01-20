import { Request, Response } from 'express';
import LoginService from '../services/loginServices';

export default class LoginControllers {
  loginService = new LoginService();

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.loginService.login(email, password);

    if (user?.message) {
      return res.status(401).json(user);
    }

    return res.status(200).json(user);
  }

  async validateToken(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (authorization) {
      const role = await this.loginService.validateToken(authorization);
      res.status(200).json({ role });
    }
  }
}
