"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginControllers_1 = require("../controllers/loginControllers");
const loginValidation_1 = require("../validation/loginValidation");
const loginRoute = (0, express_1.Router)();
const loginControllers = new loginControllers_1.default();
loginRoute.post('/', loginValidation_1.default.loginValidation, loginControllers.login.bind(loginControllers));
loginRoute.get('/validate', loginControllers.validateToken.bind(loginControllers));
exports.default = loginRoute;
//# sourceMappingURL=loginRouter.js.map