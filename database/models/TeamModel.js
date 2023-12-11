"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
// import OtherModel from './OtherModel';
class Team extends sequelize_1.Model {
}
Team.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.INTEGER,
    },
    teamName: {
        type: sequelize_1.STRING,
    },
}, {
    // ... Outras configs
    underscored: true,
    sequelize: _1.default,
    modelName: 'teams',
    timestamps: false,
});
exports.default = Team;
//# sourceMappingURL=TeamModel.js.map