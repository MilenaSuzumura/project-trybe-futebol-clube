import { Router } from 'express';
import LeaderboardControllers from '../controllers/leaderboardControllers';

const leaderboardRoute = Router();
const leaderboardControllers = new LeaderboardControllers();

leaderboardRoute.get(
  '/home',
  leaderboardControllers.getAllLeaderboard.bind(leaderboardControllers),
);

/* leaderboardRoute.get(
  '/away',
  leaderboardControllers.getAllLeaderboard.bind(leaderboardControllers),
); */

export default leaderboardRoute;
