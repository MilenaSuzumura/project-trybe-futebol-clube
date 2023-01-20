/* import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardServices';

export default class LeaderboardControllers {
  leaderboardService = new LeaderboardService();

  async getAllLeaderboard(_req: Request, res: Response) {
    const home = await this.leaderboardService.getAllHome();
    const sort = (await home).sort((a, b) => {
      const aTotalGames = a.totalVictories as number;
      const bTotalGames = b.totalVictories as number;
      if (aTotalGames > bTotalGames) {
        return -1;
      }
      if (aTotalGames < bTotalGames) {
        return 1;
      }
      return 0;
    });
    return res.status(200).json(sort);
  }

  async getAllAway(_req: Request, res: Response) {
    const away = await this.leaderboardService.getAllAway();
    const sort = (await away).sort((a, b) => {
      const aTotalGames = a.totalVictories as number;
      const bTotalGames = b.totalVictories as number;
      if (aTotalGames < bTotalGames) {
        return 1;
      }
      if (aTotalGames > bTotalGames) {
        return -1;
      }
      return 0;
    });
    return res.status(200).json(sort);
  }
}
 */
