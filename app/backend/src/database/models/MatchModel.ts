import { INTEGER, Model, BOOLEAN } from 'sequelize';
import db from '.';
// import TeamModel from './TeamModel';

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
  homeTeamId: {
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeamId: {
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
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

/* TeamModel.belongsTo(Match, { foreignKey: 'homeTeamId', as: 'id' });
TeamModel.belongsTo(Match, { foreignKey: 'awayTeamId', as: 'id' });

Match.hasMany(TeamModel, { foreignKey: 'homeTeamId', as: 'id' });
Match.hasMany(TeamModel, { foreignKey: 'awayTeamId', as: 'id' }); */

export default Match;
