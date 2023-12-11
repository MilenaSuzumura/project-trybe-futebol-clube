"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeamModel_1 = require("../models/TeamModel");
class TeamsService {
    constructor() {
        this.getTeams = async () => {
            const teams = await TeamModel_1.default.findAll();
            return teams;
        };
        this.getId = async (id) => {
            const idTeam = await TeamModel_1.default.findOne({ where: { id } });
            return idTeam;
        };
    }
}
exports.default = TeamsService;
//# sourceMappingURL=teamsServices.js.map