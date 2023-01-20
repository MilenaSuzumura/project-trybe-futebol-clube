/* import matchModel from '../models/MatchModel';
import teamModel from '../models/TeamModel';

export default class LeaderboardService {
  totalGame = async (id: number, type: string) => {
    if (type === 'homeTeam') {
      const homeTeam = await matchModel.findAll({ where: {
        inProgress: false, homeTeam: id,
      } });
      return (homeTeam.length - 1);
    }
    if (type === 'awayTeam') {
      const awayTeam = await matchModel.findAll({ where: {
        inProgress: false, awayTeam: id,
      } });
      return (awayTeam.length - 1);
    }
  };

  homeTeamGoals = async (id: number) => {
    const homeTeam = await matchModel.findAll({ where: {
      inProgress: false, homeTeam: id,
    } });
    const homeResult = homeTeam.reduce((acc, teamHome) => {
      const { homeTeamGoals, awayTeamGoals } = teamHome.dataValues;
      const total = homeTeamGoals + parseFloat(awayTeamGoals);
      acc.goalsFavor += total;
      acc.goalsOwn += homeTeamGoals;
      acc.goalsBalance += parseFloat(awayTeamGoals);

      return acc;
    }, { goalsFavor: 0, goalsOwn: 0, goalsBalance: 0 });
    if (homeResult !== null) return homeResult;
  };

  placarHome = async (id: number) => {
    const homeTeam = await matchModel.findAll({ where: {
      inProgress: false, homeTeam: id,
    } });
    const homeResult = homeTeam.reduce((acc, teamHome) => {
      const { homeTeamGoals, awayTeamGoals } = teamHome.dataValues;
      if (homeTeamGoals === awayTeamGoals) {
        acc.totalDraws += 1;
        acc.totalPoints += 1;
      }
      if (homeTeamGoals > awayTeamGoals) {
        acc.totalVictories += 1;
        acc.totalPoints += 3;
      }
      if (homeTeamGoals < awayTeamGoals) acc.totalLosses += 1;
      return acc;
    }, { totalDraws: 0, totalVictories: 0, totalLosses: 0, totalPoints: 0 });
    if (homeResult !== null) return homeResult;
  };

  getAllHome = async () => {
    const allTeam = await teamModel.findAll();
    const leaderboard = Promise.all(allTeam.map(async (team) => {
      const totalGames = await this.totalGame(team.id, 'awayTeam');
      const homeGoals = await this.homeTeamGoals(team.id);
      const placar = await this.placarHome(team.id);
      console.log(placar);
      const efficiency = ((placar?.totalPoints as number / (totalGames as number * 3)) * 100)
        .toFixed(2);
      const leaderboardNew = {
        name: team.teamName,
        totalGames,
        ...placar,
        ...homeGoals,
        efficiency,
      };
      return leaderboardNew;
    }));

    return leaderboard;
  };

  awayTeamGoals = async (id: number) => {
    const homeTeam = await matchModel.findAll({ where: {
      inProgress: false, awayTeam: id,
    } });
    const homeResult = homeTeam.reduce((acc, teamHome) => {
      const { homeTeamGoals, awayTeamGoals } = teamHome.dataValues;
      const total = homeTeamGoals + parseFloat(awayTeamGoals);
      acc.goalsFavor += total;
      acc.goalsOwn += parseFloat(awayTeamGoals);
      acc.goalsBalance += homeTeamGoals;

      return acc;
    }, { goalsFavor: 0, goalsOwn: 0, goalsBalance: 0 });
    if (homeResult !== null) return homeResult;
  };

  placarAway = async (id: number) => {
    const homeTeam = await matchModel.findAll({ where: {
      inProgress: false, awayTeam: id,
    } });
    const homeResult = homeTeam.reduce((acc, teamHome) => {
      const { homeTeamGoals, awayTeamGoals } = teamHome.dataValues;
      if (awayTeamGoals === homeTeamGoals) {
        acc.totalDraws += 1;
        acc.totalPoints += 1;
      }
      if (awayTeamGoals > homeTeamGoals) {
        acc.totalVictories += 1;
        acc.totalPoints += 3;
      }
      if (awayTeamGoals < homeTeamGoals) acc.totalLosses += 1;
      return acc;
    }, { totalDraws: 0, totalVictories: 0, totalLosses: 0, totalPoints: 0 });
    if (homeResult !== null) return homeResult;
  };

  getAllAway = async () => {
    const allTeam = await teamModel.findAll();
    const leaderboard = Promise.all(allTeam.map(async (team) => {
      const totalGames = await this.totalGame(team.id, 'homeTeam');
      const homeGoals = await this.homeTeamGoals(team.id);
      const placar = await this.placarHome(team.id);
      const efficiency = (placar?.totalPoints as number / (totalGames as number * 3)) * 100;
      const leaderboardNew = {
        name: team.teamName,
        totalGames,
        ...placar,
        ...homeGoals,
        efficiency,
      };
      return leaderboardNew;
    }));
    return leaderboard;
  };
} */
