const router = require('express').Router();
const connection = require('../../config/connection');
const dbQuery = require('../../utils/dbQuery');

router.get('/', async (req, res) => {
    if(req.session.user) {
        // find all user projects
        // try {
        //   const [rows] = await connection.query(
        //     `SELECT * FROM user_project
        //     INNER JOIN project ON user_project.project_id = project.id
        //     WHERE user_project.user_id = (SELECT user.id FROM user WHERE user.user_name = '${req.session.user}');`);

        //   res.status(200).json(rows);
        // } catch (error) {
        //   console.error("Error executing queries:", error);
        //   res.status(500).send("An error occurred while executing the database queries.");
        // }

        // find all user projects
        const query = `SELECT * FROM user_project
            INNER JOIN project ON user_project.project_id = project.id
            WHERE user_project.user_id = (SELECT user.id FROM user WHERE user.user_name = '${req.session.user}');`;

        const result = await dbQuery('GET', { query });
        res.status(200).json(result);
    } else {
        console.log('No user');
        res.send(null);
    }
});

router.get('/:id', async (req, res) => {
    // find all tasks for project by project `id`
    if(req.session.user) {
        // try {
        //   const [rows] = await connection.query(
        //     `SELECT task.id, task_name, task_description, project_id, assigned_to_id, user_name AS assigned_to, priority_id, level, status_id, status FROM task
        //     INNER JOIN user ON task.assigned_to_id = user.id
        //     INNER JOIN priority ON task.priority_id = priority.id
        //     INNER JOIN status ON task.status_id = status.id
        //     WHERE task.project_id = ${req.params.id};`);

        //   res.status(200).json(rows);
        // } catch (error) {
        //   console.error("Error executing queries:", error);
        //   res.status(500).send("An error occurred while executing the database queries.");
        // }

        const query = `SELECT task.id, task_name, task_description, project_id, assigned_to_id, user_name AS assigned_to, priority_id, level, status_id, status FROM task
            INNER JOIN user ON task.assigned_to_id = user.id
            INNER JOIN priority ON task.priority_id = priority.id
            INNER JOIN status ON task.status_id = status.id
            WHERE task.project_id = ${req.params.id};`;

        const result = await dbQuery('GET', { query });
        res.status(200).json(result);
    } else {
        console.log('No user');
        res.send(null);
    }
});

router.post('/', async (req, res) => {
  // Create new project
  if(req.session.user) {
      // try {
      //   const [rows] = await connection.query(
      //     `INSERT INTO project ( project_name )
      //     VALUES ( '${req.body.project_name}' );`);
                
      //   try {
      //     const [data] = await connection.query(
      //       `INSERT INTO user_project ( user_id, project_id, permission_id )
      //       VALUES ( (SELECT id FROM user WHERE user_name = '${req.session.user}' ), ${rows.insertId}, 3 );`);

      //     res.status(200).json(rows);
      //   } catch (error) {
      //     console.error("Error executing queries:", error);
      //     res.status(500).send("An error occurred while executing the database queries.");
      //   }
      // } catch (error) {
      //   console.error("Error executing queries:", error);
      //   res.status(500).send("An error occurred while executing the database queries.");
      // }

      let query = `INSERT INTO project ( project_name )
          VALUES ( '${req.body.project_name}' );`;

      const result1 = await dbQuery('POST', { query });

      query = `INSERT INTO user_project ( user_id, project_id, permission_id )
          VALUES ( (SELECT id FROM user WHERE user_name = '${req.session.user}' ), ${result1.insertId}, 3 );`;

      const result2 = await dbQuery('POST', { query });

      res.status(200).json(result2);
  } else {
      console.log('No user');
      res.send(null);
  }
});

router.put('/:id', async (req, res) => {
    // update project by project `id`
    if(req.session.user) {
        // try {
        //   const [rows] = await connection.query(
        //     `UPDATE project
        //     SET project_name = '${req.body.project_name}'
        //     WHERE id = ${req.params.id};`);

        //   res.status(200).json(rows);
        // } catch (error) {
        //   console.error("Error executing queries:", error);
        //   res.status(500).send("An error occurred while executing the database queries.");
        // }

        const query = `UPDATE project
            SET project_name = '${req.body.project_name}'
            WHERE id = ${req.params.id};`;

        const result = await dbQuery('PUT', { query });
        res.status(200).json(result);
    } else {
        console.log('No user');
        res.send(null);
    }
});

router.delete('/:id', async (req, res) => {
    // delete project by project `id`
    if(req.session.user) {
        // try {
        //   const [rows] = await connection.query(
        //     `DELETE FROM project WHERE id = ${req.params.id};`);

        //   res.status(200).json(rows);
        // } catch (error) {
        //   console.error("Error executing queries:", error);
        //   res.status(500).send("An error occurred while executing the database queries.");
        // }

        const query = `DELETE FROM project WHERE id = ${req.params.id};`;

        const result = await dbQuery('DELETE', { query });
        res.status(200).json(result);
    } else {
        console.log('No user');
        res.send(null);
    }
});

module.exports = router;