"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MatchModel_1 = require("../models/MatchModel");
const TeamModel_1 = require("../models/TeamModel");
class MatchesService {
    constructor() {
        this.teamInfo = async (id) => {
            const team = await TeamModel_1.default.findOne({ where: { id } });
            if (team)
                return team.dataValues;
        };
        this.matchesResult = async (matches) => {
            const mapMatches = await Promise.all(matches.map(async (matche) => {
                const teamHome = await this.teamInfo(matche.homeTeamId);
                const teamAway = await this.teamInfo(matche.awayTeamId);
                const result = {
                    ...matche,
                    homeTeam: {
                        teamName: teamHome.teamName,
                    },
                    awayTeam: {
                        teamName: teamAway.teamName,
                    },
                };
                return result;
            }));
            return mapMatches;
        };
        this.getMatches = async () => {
            const matches = await MatchModel_1.default.findAll();
            const matchesOrganizado = await Promise.all(matches.map(async (matche) => matche.dataValues));
            const mapMatches = await this.matchesResult(matchesOrganizado);
            return mapMatches;
        };
        this.filtro = async (inProgressString) => {
            const inProgress = JSON.parse(inProgressString);
            const matches = await MatchModel_1.default.findAll({ where: { inProgress } });
            const matchesOrganizado = await Promise.all(matches.map(async (matche) => matche.dataValues));
            const mapMatches = await this.matchesResult(matchesOrganizado);
            return mapMatches;
        };
        this.newMatch = async (info) => {
            const insert = await MatchModel_1.default.create({
                ...info,
                inProgress: true,
            });
            return insert.dataValues;
        };
        this.changeInProgress = async (id) => {
            const changeProgress = await MatchModel_1.default.update({ inProgress: false }, { where: { id } });
            return changeProgress;
        };
        this.changeMatches = async (id, homeTeamGoals, awayTeamGoals) => {
            const changeProgress = await MatchModel_1.default.update({ homeTeamGoals, awayTeamGoals }, {
                where: { id },
            });
            return changeProgress;
        };
    }
}
exports.default = MatchesService;
//# sourceMappingURL=matchesServices.js.map