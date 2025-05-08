const router = require('express').Router();
const userRoutes = require('./user-routes');
const projectRoutes = require('./project-routes');
const taskRoutes = require('./task-routes');
const priorityRoutes = require('./priority-routes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
// router.use('/priority', priorityRoutes);

module.exports = router;