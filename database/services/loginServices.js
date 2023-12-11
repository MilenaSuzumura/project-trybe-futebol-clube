"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bcrypt = require("bcryptjs");
const jwt_1 = require("../validation/jwt");
const UserModel_1 = require("../models/UserModel");
class LoginService {
    constructor() {
        this.jwt = new jwt_1.default();
    }
    async login(email, password) {
        const user = await UserModel_1.default.findOne({ where: { email } });
        if (!user || !Bcrypt.compareSync(password, user.password)) {
            return {
                message: 'Incorrect email or password',
            };
        }
        const userWithoutPassword = {
            id: user === null || user === void 0 ? void 0 : user.id, username: user === null || user === void 0 ? void 0 : user.username, role: user === null || user === void 0 ? void 0 : user.role, email,
        };
        const token = this.jwt.createToken(userWithoutPassword);
        return { token };
    }
    async validateToken(authorization) {
        const role = this.jwt.verificaToken(authorization);
        return role;
    }
}
exports.default = LoginService;
//# sourceMappingURL=loginServices.js.map