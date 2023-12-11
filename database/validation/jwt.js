"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
class JWT {
    constructor() {
        this.createToken = (data) => {
            const token = jwt.sign({ ...data }, String(process.env.JWT_SECRET), {
                expiresIn: '60m',
                algorithm: 'HS256',
            });
            return token;
        };
        this.verificaToken = (authorization) => {
            const role = jwt.verify(authorization, String(process.env.JWT_SECRET), (err, decoded) => decoded === null || decoded === void 0 ? void 0 : decoded.role);
            return role;
        };
    }
}
exports.default = JWT;
//# sourceMappingURL=jwt.js.map