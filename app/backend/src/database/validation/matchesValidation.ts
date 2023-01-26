import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import teamModel from '../models/TeamModel';

const matchesValidation = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    jwt.verify(authorization, String(process.env.JWT_SECRET));
    next();
  } catch (_) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

const mesmoTeam = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }
  next();
};

const teamInexistente = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  const team1 = await teamModel.findOne({ where: { id: homeTeamId } });
  const team2 = await teamModel.findOne({ where: { id: awayTeamId } });

  if (!team1 || !team2) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default { matchesValidation, mesmoTeam, teamInexistente };
