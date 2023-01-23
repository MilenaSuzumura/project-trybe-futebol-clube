import matchModel from '../models/MatchModel';
import teamModel from '../models/TeamModel';

export default class MatchesService {
  getMatches = async () => {
    const matches = await matchModel.findAll();
    const mapMatches = Promise.all(matches.map(async (matche) => {
      const teamHome = await teamModel.findOne({ where: { id: matche.homeTeamId } });
      const teamAway = await teamModel.findOne({ where: { id: matche.awayTeamId } });
      const result = {
        ...matche.dataValues,
        teamHome: {
          teamName: teamHome?.teamName,
        },
        teamAway: {
          teamName: teamAway?.teamName,
        },
      };
      return result;
    }));
    return mapMatches;
  };

  filtro = async (inProgressString: string) => {
    const inProgress = JSON.parse(inProgressString);
    const matches = await matchModel.findAll({ where: { inProgress } });
    const mapMatches = Promise.all(matches.map(async (matche) => {
      const teamAway = await teamModel.findOne({ where: { id: matche.awayTeamId } });
      const teamHome = await teamModel.findOne({ where: { id: matche.homeTeamId } });
      const result = {
        ...matche.dataValues,
        teamHome: {
          teamName: teamHome?.teamName,
        },
        teamAway: {
          teamName: teamAway?.teamName,
        },
      };
      return result;
    }));
    return mapMatches;
  };

  newMatch =
  async (homeTeamId: string, awayTeamId: string, homeTeamGoals: string, awayTeamGoals: string) => {
    if (homeTeamId === awayTeamId) {
      console.log('entrou no if do newMatch');
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
