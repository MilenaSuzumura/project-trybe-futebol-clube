"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matchesServices_1 = require("../services/matchesServices");
class MatchesControllers {
    constructor() {
        this.matchesService = new matchesServices_1.default();
        this.getMatches = async (req, res) => {
            if (req.query.inProgress !== undefined) {
                const inProgress = await this.matchesService.filtro(req.query.inProgress);
                return res.status(200).json(inProgress);
            }
            const matches = await this.matchesService.getMatches();
            return res.status(200).json(matches);
        };
    }
    async newMatch(req, res) {
        const match = await this.matchesService.newMatch(req.body);
        return res.status(201).json(match);
    }
    async changeInProgress(req, res) {
        const inProgress = await this.matchesService.changeInProgress(req.params.id);
        if (inProgress) {
            return res.status(200).json({ message: 'Finished' });
        }
    }
    async changeMatches(req, res) {
        const { homeTeamGoals, awayTeamGoals } = req.body;
        const change = await this.matchesService
            .changeMatches(req.params.id, homeTeamGoals, awayTeamGoals);
        return res.status(200).json(change);
    }
}
exports.default = MatchesControllers;
//# sourceMappingURL=matchesControllers.js.map