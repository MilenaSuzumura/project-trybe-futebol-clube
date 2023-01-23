import teamsModel from '../models/TeamModel';

export default class TeamsService {
  getTeams = async () => {
    const teams = await teamsModel.findAll();
    return teams;
  };

  getId = async (id: string) => {
    const idTeam = await teamsModel.findOne({ where: { id } });
    return idTeam;
  };
}
