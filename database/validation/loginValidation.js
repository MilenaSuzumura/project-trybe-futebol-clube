"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const schema = Joi.object({
    email: Joi.string().email().required()
        .messages({
        'string.empty': 'All fields must be filled',
    }),
    password: Joi.string().required().messages({
        'string.empty': 'All fields must be filled',
    }),
});
const loginValidation = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error === null || error === void 0 ? void 0 : error.details[0].message) {
        return res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.details[0].message });
    }
    next();
};
exports.default = { loginValidation };
//# sourceMappingURL=loginValidation.js.map