// import models
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
const Priority = require('./Priority');
const Status = require('./Status');
const UserProject = require('./UserProject');

// User belongsToMany Project
User.belongsToMany(Project, {
    through: UserProject,
    foreignKey: 'user_id',
});

// Project belongsToMany User
Project.belongsToMany(User, {
    through: UserProject,
    foreignKey: 'project_id',
});

User.hasMany(Task, {
    foreignKey: 'assigned_to_id',
});

Project.hasMany(Task, {
    foreignKey: 'project_id',
});

Task.belongsTo(Project, {
    foreignKey: 'project_id',
});

Task.belongsTo(User, {
    foreignKey: 'assigned_to_id',
});

Task.belongsTo(Priority, {
    foreignKey: 'priority_id',
});

Priority.hasMany(Task, {
    foreignKey: 'priority_id',
});

Task.belongsTo(Status, {
    foreignKey: 'status_id',
});

Status.hasMany(Task, {
    foreignKey: 'status_id',
});

module.exports = {
    User,
    Project,
    Task,
    Priority,
    Status,
    UserProject,
};