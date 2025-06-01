const router = require('express').Router();
const connection = require('../../config/connection');

router.get('/:id', async (req, res) => {
  // find one task by its `id` value
  if(req.session.user) {
      try {
        const [rows] = await connection.query(
          `SELECT * FROM task WHERE task.id = ${req.params.id};`);

        res.status(200).json(rows);
      } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
      }
  } else {
      console.log('No user');
      res.send(null);
  }
});

router.post('/', async (req, res) => {
  console.log("post");
  if(req.session.user) {
      console.log(req.session.user);
      // create new task
      try {
        const [rows] = await connection.query(
          `INSERT INTO task ( task_name, task_description, project_id, assigned_to_id, priority_id, status_id )
          VALUES (
            '${req.body.task_name}',
            '${req.body.task_description}',
            ${req.body.project_id},
            (SELECT id FROM user WHERE user_name = '${req.session.user}'),
            ${req.body.priority_id},
            ${req.body.status_id}
          );`);

        res.status(200).json(rows);
      } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
      }
  } else {
      console.log('No user');
      res.send(null);
  }
});

module.exports = router;