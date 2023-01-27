import { Router } from 'express';
import LeaderboardControllers from '../controllers/leaderboardControllers';

const leaderboardRoute = Router();
const leaderboardControllers = new LeaderboardControllers();

leaderboardRoute.get(
  '/home',
  leaderboardControllers.getAllHome.bind(leaderboardControllers),
);

leaderboardRoute.get(
  '/away',
  leaderboardControllers.getAllAway.bind(leaderboardControllers),
);

leaderboardRoute.get(
  '/',
  leaderboardControllers.getAllLeaderboard.bind(leaderboardControllers),
);

export default leaderboardRoute;
