import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardServices';

export default class LeaderboardControllers {
  leaderboardService = new LeaderboardService();

  async getAllLeaderboard(_req: Request, res: Response) {
    const [home] = await this.leaderboardService.getAllHome();
    return res.status(200).json(home);
  }

  async getAllAway(_req: Request, res: Response) {
    const [away] = await this.leaderboardService.getAllAway();
    return res.status(200).json(away);
  }
}
