import { Router } from 'express';
import MatchesControllers from '../controllers/matchesControllers';
import matchesValidation from '../validation/matchesValidation';

const matchesRoute = Router();
const matchesControllers = new MatchesControllers();

matchesRoute.get(
  '/',
  matchesControllers.getMatches.bind(matchesControllers),
);

matchesRoute.post(
  '/',
  matchesValidation.matchesValidation,
  matchesValidation.teamInexistente,
  matchesValidation.mesmoTeam,
  matchesControllers.newMatch.bind(matchesControllers),
);

matchesRoute.patch(
  '/:id',
  matchesControllers.changeMatches.bind(matchesControllers),
);

matchesRoute.patch(
  '/:id/finish',
  matchesControllers.changeInProgress.bind(matchesControllers),
);

export default matchesRoute;
