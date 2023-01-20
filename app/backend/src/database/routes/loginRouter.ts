import { Router } from 'express';
import LoginControllers from '../controllers/loginControllers';
import loginValidation from '../validation/loginValidation';

const loginRoute = Router();
const loginControllers = new LoginControllers();

loginRoute.post(
  '/',
  loginValidation.loginValidation,
  loginControllers.login.bind(loginControllers),
);

loginRoute.get(
  '/validate',
  loginControllers.validateToken.bind(loginControllers),
);

export default loginRoute;
