import matchesResultInterface from '../interface/matchesResultInterface';
import newMatchInterface from '../interface/newMatchInterface';
import matchModel from '../models/MatchModel';
import teamModel from '../models/TeamModel';

export default class MatchesService {
  teamInfo = async (id: number) => {
    const team = await teamModel.findOne({ where: { id } });
    if (team) return team.dataValues;
  };

  matchesResult = async (matches: Array<matchesResultInterface>) => {
    const mapMatches = await Promise.all(matches.map(async (matche) => {
      const teamHome = await this.teamInfo(matche.homeTeamId);
      const teamAway = await this.teamInfo(matche.awayTeamId);
      const result = {
        ...matche,
        homeTeam: {
          teamName: teamHome.teamName,
        },
        awayTeam: {
          teamName: teamAway.teamName,
        },
      };
      return result;
    }));
    return mapMatches;
  };

  getMatches = async () => {
    const matches = await matchModel.findAll();
    const matchesOrganizado = await Promise.all(matches.map(async (matche) => matche.dataValues));
    const mapMatches = await this.matchesResult(matchesOrganizado);
    return mapMatches;
  };

  filtro = async (inProgressString: string) => {
    const inProgress = JSON.parse(inProgressString);
    const matches = await matchModel.findAll({ where: { inProgress } });
    const matchesOrganizado = await Promise.all(matches.map(async (matche) => matche.dataValues));
    const mapMatches = await this.matchesResult(matchesOrganizado);
    return mapMatches;
  };

  newMatch = async (info: newMatchInterface) => {
    const insert = await matchModel.create({
      ...info,
      inProgress: true,
    });
    return insert.dataValues;
  };

  changeInProgress = async (id: string) => {
    const changeProgress = await matchModel.update({ inProgress: false }, { where: { id } });
    return changeProgress;
  };

  changeMatches = async (id: string, homeTeamGoals: string, awayTeamGoals: string) => {
    const changeProgress = await matchModel.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });
    return changeProgress;
  };
}
