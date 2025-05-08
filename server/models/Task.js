const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Task extends Model {}

Task.init(
    {
        // define columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        task_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        task_description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'project',
                key: 'id'
            }
        },
        assigned_to_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        priority_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'priority',
                key: 'id'
            }
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'status',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'task',
    }
);

module.exports = Task;