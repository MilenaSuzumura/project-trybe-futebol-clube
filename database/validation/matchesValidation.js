"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const TeamModel_1 = require("../models/TeamModel");
const matchesValidation = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
    }
    try {
        jwt.verify(authorization, String(process.env.JWT_SECRET));
        next();
    }
    catch (_) {
        return res.status(401).json({ message: 'Token must be a valid token' });
    }
};
const teamInexistente = async (req, res, next) => {
    const { homeTeamId, awayTeamId } = req.body;
    const team1 = await TeamModel_1.default.findOne({ where: { id: homeTeamId } });
    const team2 = await TeamModel_1.default.findOne({ where: { id: awayTeamId } });
    if (!team1 || !team2) {
        return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
};
const mesmoTeam = (req, res, next) => {
    const { homeTeamId, awayTeamId } = req.body;
    const homeTeam = JSON.parse(homeTeamId);
    const awayTeam = JSON.parse(awayTeamId);
    if (homeTeam === awayTeam) {
        return res.status(422).json({
            message: 'It is not possible to create a match with two equal teams',
        });
    }
    next();
};
exports.default = { matchesValidation, mesmoTeam, teamInexistente };
//# sourceMappingURL=matchesValidation.js.map