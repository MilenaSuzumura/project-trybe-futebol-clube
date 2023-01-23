import { INTEGER, Model, BOOLEAN } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Match extends Model {
  declare id: number;
  declare teamName: string;
  declare homeTeamId: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  homeTeamId: {
    type: INTEGER,
  },
  awayTeamId: {
    type: INTEGER,
  },
  awayTeamGoals: {
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

export default Match;
