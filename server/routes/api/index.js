const router = require('express').Router();
const userRoutes = require('./user-routes');
const projectRoutes = require('./project-routes');
const userProjectRoutes = require('./user-project-routes');
const taskRoutes = require('./task-routes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/project-users', userProjectRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;