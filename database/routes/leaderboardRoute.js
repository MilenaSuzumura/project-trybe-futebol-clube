"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboardControllers_1 = require("../controllers/leaderboardControllers");
const leaderboardRoute = (0, express_1.Router)();
const leaderboardControllers = new leaderboardControllers_1.default();
leaderboardRoute.get('/home', leaderboardControllers.getAllHome.bind(leaderboardControllers));
leaderboardRoute.get('/away', leaderboardControllers.getAllAway.bind(leaderboardControllers));
leaderboardRoute.get('/', leaderboardControllers.getAllLeaderboard.bind(leaderboardControllers));
exports.default = leaderboardRoute;
//# sourceMappingURL=leaderboardRoute.js.map