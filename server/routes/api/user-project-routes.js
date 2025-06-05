const router = require('express').Router();
const connection = require('../../config/connection');
const dbQuery = require('../../utils/dbQuery');
const { checkProjectAccess, checkProjectPrivilege } = require('../../utils/authorize');

router.get('/:id', async (req, res) => {
    // find all members for project by project `id`

    if(req.session.user) {
        // check authorization (session-user to project id)
        const auth = await checkProjectAccess({project_id: req.params.id, 
            user_name: req.session.user});
        
        if (auth.authorized == true) {
            const query = `SELECT user_project.id, user.id AS user_id, user.user_name, permission.level, permission.id AS permission_id FROM user_project
                INNER JOIN user ON user_project.user_id = user.id
                INNER JOIN permission ON user_project.permission_id = permission.id
                WHERE project_id = ${req.params.id};`;

            const result = await dbQuery('GET', { query });
            res.status(200).json(result);
        } else {
            res.status(200).send(null);
        }
    } else {
        res.send(null);
    }
});

router.get('/permission/:id', async (req, res) => {
    // get current user permission level by project `id`

    if(req.session.user) {
            const query = `SELECT user_project.id as project_id, user.id AS user_id, user.user_name, permission_id FROM user_project
                INNER JOIN user ON user_project.user_id = user.id
                WHERE project_id = ${req.params.id}
                AND user_project.user_id = (SELECT id FROM user WHERE user_name = '${req.session.user}');`;

            const result = await dbQuery('GET', { query });
            res.status(200).json(result);
    } else {
        res.send(null);
    }
});

router.post('/', async (req, res) => {
  // add new member to project
  
  if(req.session.user) {

        // check authorization (session-user to project permission 3)
        const auth = await checkProjectPrivilege({project_id: req.body.project_id, 
                user_name: req.session.user,
                permission_id: 3});
        
        if (auth.authorized == true) {
            // check if user exists
            let query = `SELECT user.id FROM user WHERE user.user_name = '${req.body.user_name}';`;

            const result1 = await dbQuery('GET', { query });

            if(result1[0] && result1[0].id) {
                query = `INSERT INTO user_project ( user_id, project_id, permission_id )
                    VALUES (
                        (SELECT user.id FROM user WHERE user.user_name = '${req.body.user_name}'),
                        ${req.body.project_id},
                        ${req.body.permission_id}
                    );`;

                const result = await dbQuery('POST', { query });
                res.status(200).json(result);
            } else {
                res.status(200).send(null);
            }
        } else {
            res.status(200).send(null);
        }
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
            const query = `UPDATE user_project
                SET permission_id = ${req.body.permission_id}
                WHERE user_id = ${req.body.user_id} AND project_id = ${req.params.id};`;

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
            const query = `DELETE FROM user_project
                WHERE project_id = ${req.params.id} AND user_id = ${req.body.user_id};`;

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