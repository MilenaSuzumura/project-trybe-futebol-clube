"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginServices_1 = require("../services/loginServices");
class LoginControllers {
    constructor() {
        this.loginService = new loginServices_1.default();
    }
    async login(req, res) {
        const { email, password } = req.body;
        const user = await this.loginService.login(email, password);
        if (user === null || user === void 0 ? void 0 : user.message) {
            return res.status(401).json(user);
        }
        return res.status(200).json(user);
    }
    async validateToken(req, res) {
        const { authorization } = req.headers;
        if (authorization) {
            const role = await this.loginService.validateToken(authorization);
            res.status(200).json({ role });
        }
    }
}
exports.default = LoginControllers;
//# sourceMappingURL=loginControllers.js.map