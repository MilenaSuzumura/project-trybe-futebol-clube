import { Request, Response } from 'express';
import leaderboardInterface from '../interface/leaderboardInterface';
import LeaderboardService from '../services/leaderboardServices';

export default class LeaderboardControllers {
  leaderboardService = new LeaderboardService();

  async getAllHome(_req: Request, res: Response) {
    const [home] = await this.leaderboardService.getAllHome();
    return res.status(200).json(home);
  }

  async getAllAway(_req: Request, res: Response) {
    const [away] = await this.leaderboardService.getAllAway();
    return res.status(200).json(away);
  }

  async getAllLeaderboard(_req: Request, res: Response) {
    const [home] = await this.leaderboardService.getAllHome();
    const [away] = await this.leaderboardService.getAllAway();
    const result = await this.leaderboardService.getAllLeaderboard(
      home as Array<leaderboardInterface>,
      away as Array<leaderboardInterface>,
    );
    return res.status(200).json(result);
  }
}
