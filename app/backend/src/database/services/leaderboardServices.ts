import leaderboardInterface from '../interface/leaderboardInterface';
import leaderboardInterface2 from '../interface/leaderboardInterface2';
import sequelize from '../models';

export default class LeaderboardService {
  getAllHome = async () => (sequelize.query(`SELECT team_name as name,
  COUNT(matches.home_team_id = teams.id) as totalGames,
  (SUM(matches.home_team_goals > matches.away_team_goals) * 3) +
  SUM(matches.home_team_goals = matches.away_team_goals) as totalPoints,
  SUM(matches.home_team_goals > matches.away_team_goals) AS totalVictories,
  SUM(matches.home_team_goals < matches.away_team_goals) AS totalLosses,
  SUM(matches.home_team_goals = matches.away_team_goals) AS totalDraws,
  SUM(matches.home_team_goals) as goalsFavor, SUM(matches.away_team_goals) as goalsOwn,
  SUM(matches.home_team_goals) - SUM(matches.away_team_goals) as goalsBalance,
  ROUND(((SUM( CASE
      WHEN matches.home_team_goals > matches.away_team_goals THEN 3
      WHEN matches.home_team_goals = matches.away_team_goals THEN 1
      ELSE 0
    END) / (COUNT(teams.team_name)*3)) * 100),2) as efficiency
  FROM TRYBE_FUTEBOL_CLUBE.matches as matches
  INNER JOIN  TRYBE_FUTEBOL_CLUBE.teams as teams
  ON teams.id = matches.home_team_id
  WHERE matches.in_progress = false
  GROUP BY teams.team_name ORDER BY totalPoints DESC, goalsBalance DESC,
  goalsFavor DESC, goalsOwn ASC;`));

  getAllAway = async () => (sequelize.query(`SELECT team_name as name,
  COUNT(matches.away_team_id = teams.id) as totalGames,
  (SUM(matches.away_team_goals > matches.home_team_goals) * 3) +
  SUM(matches.away_team_goals = matches.home_team_goals) as totalPoints,
  SUM(matches.away_team_goals > matches.home_team_goals) AS totalVictories,
  SUM(matches.away_team_goals < matches.home_team_goals) AS totalLosses,
  SUM(matches.away_team_goals = matches.home_team_goals) AS totalDraws,
  SUM(matches.away_team_goals) as goalsFavor, SUM(matches.home_team_goals) as goalsOwn,
  SUM(matches.away_team_goals) - SUM(matches.home_team_goals) as goalsBalance,
  ROUND(((SUM( CASE
      WHEN matches.away_team_goals > matches.home_team_goals THEN 3
      WHEN matches.away_team_goals = matches.home_team_goals THEN 1
      ELSE 0
    END) / (COUNT(teams.team_name)*3)) * 100),2) as efficiency
  FROM TRYBE_FUTEBOL_CLUBE.matches as matches
  INNER JOIN  TRYBE_FUTEBOL_CLUBE.teams as teams
  ON teams.id = matches.away_team_id
  WHERE matches.in_progress = false
  GROUP BY teams.team_name ORDER BY totalPoints DESC, goalsBalance DESC,
  goalsFavor DESC, goalsOwn ASC;`));

  convertString = (team: leaderboardInterface) => ({
    name: team.name,
    totalPoints: parseFloat(team.totalPoints),
    totalGames: team.totalGames,
    totalVictories: parseFloat(team.totalVictories),
    totalLosses: parseFloat(team.totalLosses),
    totalDraws: parseFloat(team.totalDraws),
    goalsFavor: parseFloat(team.goalsFavor),
    goalsOwn: parseFloat(team.goalsOwn),
    goalsBalance: parseFloat(team.goalsBalance),
  });

  count = (team1: leaderboardInterface2, team2: leaderboardInterface2) => {
    const teamResult = { ...team1 };
    const efficiency = ((teamResult.totalPoints / (teamResult.totalGames * 3)) * 100)
      .toFixed(2);
    teamResult.totalPoints += team2.totalPoints;
    teamResult.totalGames += team2.totalGames;
    teamResult.totalVictories += team2.totalVictories;
    teamResult.totalLosses += team2.totalLosses;
    teamResult.totalDraws += team2.totalDraws;
    teamResult.goalsFavor += team2.goalsFavor;
    teamResult.goalsOwn += team2.goalsOwn;
    teamResult.goalsBalance += team2.goalsBalance;
    return { ...teamResult, efficiency };
  };

  getAllLeaderboard =
  async (home: Array<leaderboardInterface>, away: Array<leaderboardInterface>) => {
    const map = await Promise.all(home.map((team) => {
      const team2 = away.find((teamAway) => team.name === teamAway.name);
      if (team2) {
        const team1C = this.convertString(team);
        const team2C = this.convertString(team2);
        const teamResult = this.count(team1C, team2C);
        return teamResult;
      }
      return this.convertString(team);
    }));
    return map;
  };
}
