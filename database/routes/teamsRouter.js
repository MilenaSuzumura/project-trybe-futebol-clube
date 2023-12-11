"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teamsControllers_1 = require("../controllers/teamsControllers");
const teamsRoute = (0, express_1.Router)();
const teamsControllers = new teamsControllers_1.default();
teamsRoute.get('/', teamsControllers.getTeams.bind(teamsControllers));
teamsRoute.get('/:id', teamsControllers.getId.bind(teamsControllers));
exports.default = teamsRoute;
//# sourceMappingURL=teamsRouter.js.map