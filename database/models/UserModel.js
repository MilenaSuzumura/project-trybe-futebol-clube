"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
// import OtherModel from './OtherModel';
class User extends sequelize_1.Model {
}
User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.INTEGER,
    },
    username: {
        type: sequelize_1.STRING,
    },
    role: {
        type: sequelize_1.STRING,
    },
    email: {
        type: sequelize_1.STRING,
    },
    password: {
        type: sequelize_1.STRING,
    },
}, {
    // ... Outras configs
    underscored: true,
    sequelize: _1.default,
    modelName: 'users',
    timestamps: false,
});
exports.default = User;
//# sourceMappingURL=UserModel.js.map