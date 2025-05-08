const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class UserProject extends Model {}

UserProject.init(
    {
        // define columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        project_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'task',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user_project',
    }
);

module.exports = UserProject;