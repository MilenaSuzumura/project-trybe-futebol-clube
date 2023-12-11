"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teamsServices_1 = require("../services/teamsServices");
class TeamsControllers {
    constructor() {
        this.teamsService = new teamsServices_1.default();
        this.getId = async (req, res) => {
            const { id } = req.params;
            const idTeam = await this.teamsService.getId(id);
            return res.status(200).json(idTeam);
        };
    }
    async getTeams(_req, res) {
        const teams = await this.teamsService.getTeams();
        return res.status(200).json(teams);
    }
}
exports.default = TeamsControllers;
//# sourceMappingURL=teamsControllers.js.map