const router = require('express').Router();
const connection = require('../../config/connection');

router.get('/', async (req, res) => {

    if(req.session.user) {
        // find all user projects
        try {
          const [rows] = await connection.query(
            `SELECT * FROM user_project
            INNER JOIN project ON user_project.project_id = project.id
            WHERE user_project.user_id = (SELECT user.id FROM user WHERE user.user_name = '${req.session.user}');`);

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

router.get('/:id', async (req, res) => {
    // find all tasks for project by project `id`
    if(req.session.user) {
        try {
          const [rows] = await connection.query(
            `SELECT * FROM task
            INNER JOIN user ON task.assigned_to_id = user.id
            INNER JOIN priority ON task.priority_id = priority.id
            INNER JOIN status ON task.status_id = status.id
            WHERE task.id = ${req.params.id};`);

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
  if(req.session.user) {
      console.log(req.session.user);
      // Create new project
      try {
        const [rows] = await connection.query(
          `INSERT INTO project ( project_name )
          VALUES ( '${req.body.project_name}' );`);
                
        try {
          const [data] = await connection.query(
            `INSERT INTO user_project ( user_id, project_id, permission_id )
            VALUES ( (SELECT id FROM user WHERE user_name = '${req.session.user}' ), ${rows.insertId}, 3 );`);

          res.status(200).json(rows);
        } catch (error) {
          console.error("Error executing queries:", error);
          res.status(500).send("An error occurred while executing the database queries.");
        }
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