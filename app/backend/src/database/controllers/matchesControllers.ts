import { Request, Response } from 'express';
import MatchesService from '../services/matchesServices';

export default class MatchesControllers {
  matchesService = new MatchesService();

  getMatches = async (req: Request, res: Response) => {
    if (req.query.inProgress !== undefined) {
      const inProgress = await this.matchesService.filtro(req.query.inProgress as string);
      return res.status(200).json(inProgress);
    }

    const matches = await this.matchesService.getMatches();
    return res.status(200).json(matches);
  };

  async newMatch(req: Request, res: Response) {
    const match = await this.matchesService.newMatch(req.body);
    return res.status(201).json(match);
  }

  async changeInProgress(req: Request, res: Response) {
    const inProgress = await this.matchesService.changeInProgress(req.params.id);
    if (inProgress) {
      return res.status(200).json({ message: 'Finished' });
    }
  }

  async changeMatches(req: Request, res: Response) {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const change = await this.matchesService
      .changeMatches(req.params.id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json(change);
  }
}
