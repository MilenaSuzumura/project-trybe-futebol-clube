/* import * as jwt from 'jsonwebtoken';

export default class JWT {
  createToken = (data: object) => {
    const token = jwt.sign({ ...data }, String(process.env.JWT_SECRET), {
      expiresIn: '60m',
      algorithm: 'HS256',
    });

    return token;
  };

  verificaToken = (authorization: string) => {
    const role = jwt.verify(
      authorization,
      String(process.env.JWT_SECRET),
      (err, decoded) => decoded?.role,
    );
    return role;
  };
} */
