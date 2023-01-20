/* import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const schema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'All fields must be filled',
    }),
  password: Joi.string().required().messages({
    'string.empty': 'All fields must be filled',
  }),
});

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error?.details[0].message) {
    return res.status(400).json({ message: error?.details[0].message });
  }

  next();
};

export default { loginValidation }; */
