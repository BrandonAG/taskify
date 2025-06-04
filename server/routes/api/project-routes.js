const router = require('express').Router();
const connection = require('../../config/connection');
const dbQuery = require('../../utils/dbQuery');
const { checkProjectAccess, checkProjectPrivilege } = require('../../utils/authorize');

router.get('/', async (req, res) => {
    if(req.session.user) {
        // find all user projects
        const query = `SELECT * FROM user_project
            INNER JOIN project ON user_project.project_id = project.id
            WHERE user_project.user_id = (SELECT user.id FROM user WHERE user.user_name = '${req.session.user}');`;

        const result = await dbQuery('GET', { query });
        res.status(200).json(result);
    } else {
        res.send(null);
    }
});

router.get('/:id', async (req, res) => {
    // find all tasks for project by project `id`

    if(req.session.user) {

        // check authorization (session-user to project id)
        const auth = await checkProjectAccess({project_id: req.params.id, 
            user_name: req.session.user});
        
        if (auth.authorized == true) {
            const query = `SELECT task.id, task_name, task_description, project_id, assigned_to_id, user_name AS assigned_to, priority_id, level, status_id, status FROM task
                INNER JOIN user ON task.assigned_to_id = user.id
                INNER JOIN priority ON task.priority_id = priority.id
                INNER JOIN status ON task.status_id = status.id
                WHERE task.project_id = ${req.params.id};`;

            const result = await dbQuery('GET', { query });
            res.status(200).json(result);
        } else {
            res.status(200).send(null);
        }
    } else {
        res.send(null);
    }
});

router.post('/', async (req, res) => {
  // Create new project
  if(req.session.user) {
      let query = `INSERT INTO project ( project_name )
          VALUES ( '${req.body.project_name}' );`;

      const result1 = await dbQuery('POST', { query });

      query = `INSERT INTO user_project ( user_id, project_id, permission_id )
          VALUES ( (SELECT id FROM user WHERE user_name = '${req.session.user}' ), ${result1.insertId}, 3 );`;

      const result2 = await dbQuery('POST', { query });

      res.status(200).json(result2);
  } else {
      res.send(null);
  }
});

router.put('/:id', async (req, res) => {
    // update project by project `id`

    if(req.session.user) {
        // check authorization (session-user to project permission 3)
        const auth = await checkProjectPrivilege({project_id: req.params.id, 
                user_name: req.session.user,
                permission_id: 3});
        
        if (auth.authorized == true) {
            const query = `UPDATE project
                SET project_name = '${req.body.project_name}'
                WHERE id = ${req.params.id};`;

            const result = await dbQuery('PUT', { query });
            res.status(200).json(result);
        } else {
            res.status(200).send(null);
        }
    } else {
        res.send(null);
    }
});

router.delete('/:id', async (req, res) => {
    // delete project by project `id`

    if(req.session.user) {
        // check authorization (session-user to project permission 3)
        const auth = await checkProjectPrivilege({project_id: req.params.id, 
                user_name: req.session.user,
                permission_id: 3});
        
        if (auth.authorized == true) {
            const query = `DELETE FROM project WHERE id = ${req.params.id};`;

            const result = await dbQuery('DELETE', { query });
            res.status(200).json(result);
        } else {
            res.status(200).send(null);
        }
    } else {
        res.send(null);
    }
});

module.exports = router;