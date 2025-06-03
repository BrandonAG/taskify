const router = require('express').Router();
const connection = require('../../config/connection');
const dbQuery = require('../../utils/dbQuery');

router.get('/:id', async (req, res) => {
    // find all members for project by project `id`
    if(req.session.user) {
        // try {
        //   const [rows] = await connection.query(
        //     `SELECT user_project.id, user.id AS user_id, user.user_name, permission.level, permission.id AS permission_id FROM user_project
        //     INNER JOIN user ON user_project.user_id = user.id
        //     INNER JOIN permission ON user_project.permission_id = permission.id
        //     WHERE project_id = ${req.params.id};`);

        //   res.status(200).json(rows);
        // } catch (error) {
        //   console.error("Error executing queries:", error);
        //   res.status(500).send("An error occurred while executing the database queries.");
        // }

        const query = `SELECT user_project.id, user.id AS user_id, user.user_name, permission.level, permission.id AS permission_id FROM user_project
            INNER JOIN user ON user_project.user_id = user.id
            INNER JOIN permission ON user_project.permission_id = permission.id
            WHERE project_id = ${req.params.id};`;

        const result = await dbQuery('GET', { query });
        res.status(200).json(result);
    } else {
        console.log('No user');
        res.send(null);
    }
});

router.post('/', async (req, res) => {
  if(req.session.user) {
      // Create new user-project
      // try {
      //   const [rows] = await connection.query(
      //     `INSERT INTO user_project ( user_id, project_id, permission_id )
      //     VALUES (
      //       (SELECT user.id FROM user WHERE user.user_name = '${req.body.user_name}'),
      //       ${req.body.project_id},
      //       ${req.body.permission_id}
      //     );`);
        
      // } catch (error) {
      //   console.error("Error executing queries:", error);
      //   res.status(500).send("An error occurred while executing the database queries.");
      // }

      const query = `INSERT INTO user_project ( user_id, project_id, permission_id )
          VALUES (
            (SELECT user.id FROM user WHERE user.user_name = '${req.body.user_name}'),
            ${req.body.project_id},
            ${req.body.permission_id}
          );`;

      const result = await dbQuery('POST', { query });
      res.status(200).json(result);
  } else {
      console.log('No user');
      res.send(null);
  }
});

router.put('/:id', async (req, res) => {
    // update project by project `id`
    console.log("PUT");
    if(req.session.user) {
        // try {
        //   const [rows] = await connection.query(
        //     `UPDATE user_project
        //     SET permission_id = ${req.body.permission_id}
        //     WHERE user_id = ${req.body.user_id} AND project_id = ${req.params.id};`);
        
        //   res.status(200).json(rows);
        // } catch (error) {
        //   console.error("Error executing queries:", error);
        //   res.status(500).send("An error occurred while executing the database queries.");
        // }

        const query = `UPDATE user_project
            SET permission_id = ${req.body.permission_id}
            WHERE user_id = ${req.body.user_id} AND project_id = ${req.params.id};`;

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
        //     `DELETE FROM user_project WHERE project_id = ${req.params.id} AND user_id = ${req.body.user_id};`);

        //   res.status(200).json(rows);
        // } catch (error) {
        //   console.error("Error executing queries:", error);
        //   res.status(500).send("An error occurred while executing the database queries.");
        // }

        const query = `DELETE FROM user_project
        WHERE project_id = ${req.params.id} AND user_id = ${req.body.user_id};`;

        const result = await dbQuery('DELETE', { query });
        res.status(200).json(result);
    } else {
        console.log('No user');
        res.send(null);
    }
});

module.exports = router;