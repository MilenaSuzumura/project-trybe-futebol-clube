import { Request, Response } from 'express';
import MatchesService from '../services/matchesServices';

export default class MatchesControllers {
  matchesService = new MatchesService();

  getMatches = async (req: Request, res: Response) => {
    if (req.query.inProgress) {
      const inProgress = await this.matchesService.filtro(req.query.inProgress as string);
      return res.status(200).json(inProgress);
    }

    const matches = await this.matchesService.getMatches();
    return res.status(200).json(matches);
  };

  async newMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const match = await this.matchesService
      .newMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    if (match.message) {
      return res.status(match.status).json({ message: match.message });
    }
    return res.status(match.status).json(match);
  }

  async changeInProgress(req: Request, res: Response) {
    const inProgress = await this.matchesService.changeInProgress(req.params.id);
    if (inProgress) {
      return res.status(200).json({ message: 'Finished' });
    }
  }
}
