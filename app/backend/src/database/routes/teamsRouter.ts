import { Router } from 'express';
import TeamsControllers from '../controllers/teamsControllers';

const teamsRoute = Router();
const teamsControllers = new TeamsControllers();

teamsRoute.get(
  '/',
  teamsControllers.getTeams.bind(teamsControllers),
);

teamsRoute.get('/:id', teamsControllers.getId.bind(teamsControllers));

export default teamsRoute;
