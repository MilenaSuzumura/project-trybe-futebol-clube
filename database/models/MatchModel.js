"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
// import TeamModel from './TeamModel';
class Match extends sequelize_1.Model {
}
Match.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.INTEGER,
    },
    homeTeamId: {
        type: sequelize_1.INTEGER,
        references: {
            model: 'teams',
            key: 'id',
        },
    },
    homeTeamGoals: {
        type: sequelize_1.INTEGER,
    },
    awayTeamId: {
        type: sequelize_1.INTEGER,
        references: {
            model: 'teams',
            key: 'id',
        },
    },
    awayTeamGoals: {
        type: sequelize_1.INTEGER,
    },
    inProgress: {
        type: sequelize_1.BOOLEAN,
    },
}, {
    // ... Outras configs
    underscored: true,
    sequelize: _1.default,
    modelName: 'matches',
    timestamps: false,
});
/* TeamModel.belongsTo(Match, { foreignKey: 'homeTeamId', as: 'id' });
TeamModel.belongsTo(Match, { foreignKey: 'awayTeamId', as: 'id' });

Match.hasMany(TeamModel, { foreignKey: 'homeTeamId', as: 'id' });
Match.hasMany(TeamModel, { foreignKey: 'awayTeamId', as: 'id' }); */
exports.default = Match;
//# sourceMappingURL=MatchModel.js.map