import * as Bcrypt from 'bcryptjs';
import JWT from '../validation/jwt';
import usersModel from '../models/UserModel';

export default class LoginService {
  jwt = new JWT();

  async login(email: string, password: string) {
    const user = await usersModel.findOne({ where: { email } });

    if (!user || !Bcrypt.compareSync(password, user.password)) {
      return {
        message: 'Incorrect email or password',
      };
    }

    const userWithoutPassword = {
      id: user?.id, username: user?.username, role: user?.role, email,
    };
    const token = this.jwt.createToken(userWithoutPassword);
    return { token };
  }

  async validateToken(authorization: string) {
    const role = this.jwt.verificaToken(authorization);
    return role;
  }
}
