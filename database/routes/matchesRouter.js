"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matchesControllers_1 = require("../controllers/matchesControllers");
const matchesValidation_1 = require("../validation/matchesValidation");
const matchesRoute = (0, express_1.Router)();
const matchesControllers = new matchesControllers_1.default();
matchesRoute.get('/', matchesControllers.getMatches.bind(matchesControllers));
matchesRoute.post('/', matchesValidation_1.default.matchesValidation, matchesValidation_1.default.teamInexistente, matchesValidation_1.default.mesmoTeam, matchesControllers.newMatch.bind(matchesControllers));
matchesRoute.patch('/:id', matchesControllers.changeMatches.bind(matchesControllers));
matchesRoute.patch('/:id/finish', matchesControllers.changeInProgress.bind(matchesControllers));
exports.default = matchesRoute;
//# sourceMappingURL=matchesRouter.js.map