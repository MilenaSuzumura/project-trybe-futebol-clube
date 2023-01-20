/* import matchModel from '../models/MatchModel';
import teamModel from '../models/TeamModel';

export default class MatchesService {
  getMatches = async () => {
    const matches = await matchModel.findAll();
    const mapMatches = Promise.all(matches.map(async (matche) => {
      const teamHome = await teamModel.findOne({ where: { id: matche.homeTeam } });
      const teamAway = await teamModel.findOne({ where: { id: matche.awayTeam } });
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
      const teamAway = await teamModel.findOne({ where: { id: matche.awayTeam } });
      const teamHome = await teamModel.findOne({ where: { id: matche.homeTeam } });
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
  async (homeTeam: string, awayTeam: string, homeTeamGoals: string, awayTeamGoals: string) => {
    if (homeTeam === awayTeam) {
      console.log('entrou no if do newMatch');
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }

    const team1 = await teamModel.findOne({ where: { id: homeTeam } });
    const team2 = await teamModel.findOne({ where: { id: awayTeam } });
    if (team1 && team2) {
      const insert = await matchModel.create({
        homeTeam,
        awayTeam,
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
} */
