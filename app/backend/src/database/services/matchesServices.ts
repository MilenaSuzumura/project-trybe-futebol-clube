import matchesResultInterface from '../interface/matchesResultInterface';
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

  newMatch =
  async (homeTeamId: string, awayTeamId: string, homeTeamGoals: string, awayTeamGoals: string) => {
    if (homeTeamId === awayTeamId) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }

    const team1 = await teamModel.findOne({ where: { id: homeTeamId } });
    const team2 = await teamModel.findOne({ where: { id: awayTeamId } });
    if (team1 && team2) {
      const insert = await matchModel.create({
        homeTeamId,
        awayTeamId,
        awayTeamGoals,
        homeTeamGoals,
        inProgress: true,
      });
      return insert.dataValues;
    }
    return { status: 404, message: 'There is no team with such id!' };
  };

  changeInProgress = async (id: string) => {
    const changeProgress = await matchModel.update({ inProgress: false }, { where: { id } });
    return changeProgress;
  };
}
