const router = require('express').Router();
const connection = require('../../config/connection');
const dbQuery = require('../../utils/dbQuery');
const { checkProjectAccess, checkProjectPrivilege } = require('../../utils/authorize');

router.post('/', async (req, res) => {
  // create new task

  if(req.session.user) {
      // check authorization (session-user to project permission 2 or 3)
      const auth = await checkProjectPrivilege({project_id: req.body.project_id, 
                user_name: req.session.user,
                permission_id: 2});
      if (auth.authorized == true) {
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
        res.status(200).send(null);
      }
  } else {
      res.send(null);
  }
});

router.put('/:id', async (req, res) => {
  // update task by its `id` value

  if(req.session.user) {
      // check authorization (session-user to project permission 2 or 3)
      const auth = await checkProjectPrivilege({project_id: req.body.project_id, 
                user_name: req.session.user,
                permission_id: 2});
      if (auth.authorized == true) {
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
        res.status(200).send(null);
      }
  } else {
      res.send(null);
  }
});

router.delete('/:id', async (req, res) => {
    // delete task by task `id`
    
    if(req.session.user) {
        // check authorization (session-user to project permission 2 or 3)
      const auth = await checkProjectPrivilege({project_id: req.body.project_id, 
                user_name: req.session.user,
                permission_id: 2});
      if (auth.authorized == true) {
        const query = `DELETE FROM task WHERE id = ${req.params.id};`;

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