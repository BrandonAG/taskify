const router = require('express').Router();
const connection = require('../../config/connection');
const dbQuery = require('../../utils/dbQuery');

router.get('/:id', async (req, res) => {
  // find one task by its `id` value
  if(req.session.user) {
      // try {
      //   const [rows] = await connection.query(
      //     `SELECT * FROM task WHERE task.id = ${req.params.id};`);

      //   res.status(200).json(rows);
      // } catch (error) {
      //   console.error("Error executing queries:", error);
      //   res.status(500).send("An error occurred while executing the database queries.");
      // }

      const query = `SELECT * FROM task WHERE task.id = ${req.params.id};`;

      const result = await dbQuery('GET', { query });
      res.status(200).json(result);
  } else {
      console.log('No user');
      res.send(null);
  }
});

router.post('/', async (req, res) => {
  if(req.session.user) {
      // create new task
      // try {
      //   const [rows] = await connection.query(
      //     `INSERT INTO task ( task_name, task_description, project_id, assigned_to_id, priority_id, status_id )
      //     VALUES (
      //       '${req.body.task_name}',
      //       '${req.body.task_description}',
      //       ${req.body.project_id},
      //       (SELECT id FROM user WHERE user_name = '${req.session.user}'),
      //       ${req.body.priority_id},
      //       ${req.body.status_id}
      //     );`);

      //   res.status(200).json(rows);
      // } catch (error) {
      //   console.error("Error executing queries:", error);
      //   res.status(500).send("An error occurred while executing the database queries.");
      // }

      const query = `INSERT INTO task ( task_name, task_description, project_id, assigned_to_id, priority_id, status_id )
          VALUES (
            '${req.body.task_name}',
            '${req.body.task_description}',
            ${req.body.project_id},
            (SELECT id FROM user WHERE user_name = '${req.session.user}'),
            ${req.body.priority_id},
            ${req.body.status_id}
          );`;

      const result = await dbQuery('POST', { query });
      res.status(200).json(result);
  } else {
      console.log('No user');
      res.send(null);
  }
});

router.put('/:id', async (req, res) => {
  // update task by its `id` value
  if(req.session.user) {
      // try {
      //   const [rows] = await connection.query(
      //     `UPDATE task
      //     SET task_name = '${req.body.task_name}',
      //     task_description = '${req.body.task_description}',
      //     assigned_to_id = ${req.body.assigned_to_id},
      //     priority_id = ${req.body.priority_id},
      //     status_id = ${req.body.status_id}
      //     WHERE task.id = ${req.params.id};`);

      //   res.status(200).json(rows);
      // } catch (error) {
      //   console.error("Error executing queries:", error);
      //   res.status(500).send("An error occurred while executing the database queries.");
      // }

      const query = `UPDATE task
          SET task_name = '${req.body.task_name}',
          task_description = '${req.body.task_description}',
          assigned_to_id = ${req.body.assigned_to_id},
          priority_id = ${req.body.priority_id},
          status_id = ${req.body.status_id}
          WHERE task.id = ${req.params.id};`;

      const result = await dbQuery('PUT', { query });
      res.status(200).json(result);
  } else {
      console.log('No user');
      res.send(null);
  }
});

router.delete('/:id', async (req, res) => {
    // delete task by project `id`
    if(req.session.user) {
        // try {
        //   const [rows] = await connection.query(
        //     `DELETE FROM task WHERE id = ${req.params.id};`);

        //   res.status(200).json(rows);
        // } catch (error) {
        //   console.error("Error executing queries:", error);
        //   res.status(500).send("An error occurred while executing the database queries.");
        // }

        const query = `DELETE FROM task WHERE id = ${req.params.id};`;

        const result = await dbQuery('DELETE', { query });
        res.status(200).json(result);
    } else {
        console.log('No user');
        res.send(null);
    }
});

module.exports = router;