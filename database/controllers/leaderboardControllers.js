"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leaderboardServices_1 = require("../services/leaderboardServices");
class LeaderboardControllers {
    constructor() {
        this.leaderboardService = new leaderboardServices_1.default();
    }
    async getAllHome(_req, res) {
        const [home] = await this.leaderboardService.getAllHome();
        return res.status(200).json(home);
    }
    async getAllAway(_req, res) {
        const [away] = await this.leaderboardService.getAllAway();
        return res.status(200).json(away);
    }
    async getAllLeaderboard(_req, res) {
        const [home] = await this.leaderboardService.getAllHome();
        const [away] = await this.leaderboardService.getAllAway();
        const result = await this.leaderboardService.getAllLeaderboard(home, away);
        return res.status(200).json(result);
    }
}
exports.default = LeaderboardControllers;
//# sourceMappingURL=leaderboardControllers.js.map