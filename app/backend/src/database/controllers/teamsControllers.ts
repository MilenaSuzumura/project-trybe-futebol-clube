import { Request, Response } from 'express';
import TeamsService from '../services/teamsServices';

export default class TeamsControllers {
  teamsService = new TeamsService();

  async getTeams(_req: Request, res: Response) {
    const teams = await this.teamsService.getTeams();
    return res.status(200).json(teams);
  }

  getId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const idTeam = await this.teamsService.getId(id);
    return res.status(200).json(idTeam);
  };
}
