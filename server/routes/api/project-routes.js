const router = require('express').Router();
const { Project, UserProject, Task } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {

    if(req.session.user) {
        // find all categories
        // be sure to include its associated Products
        UserProject.sequelize.query(
            `SELECT * FROM user_project INNER JOIN project ON user_project.project_id = project.id WHERE user_project.user_id = (SELECT user.id FROM user WHERE user.user_name = '${req.session.user}');`,
            {
                model: UserProject,
                mapToModel: true
            }
        )
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    } else {
        console.log('No user');
        res.send(null);
    }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Task.sequelize.query(
    `SELECT * FROM task
    INNER JOIN user ON task.assigned_to_id = user.id
    INNER JOIN priority ON task.priority_id = priority.id
    INNER JOIN status ON task.status_id = status.id
    WHERE task.id = ${req.params.id};`,
    {
        model: UserProject,
        mapToModel: true
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  if(req.session.user) {
      console.log(req.session.user);
      // find all categories
      // be sure to include its associated Products
      Project.create({ project_name: req.body.project_name })
      .then(dbPostData => {
        UserProject.sequelize.query(`INSERT INTO user_project ( user_id, project_id ) VALUES ( (SELECT id FROM user WHERE user_name = '${req.session.user}' ), ${dbPostData.id} );`)
        res.json(dbPostData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  } else {
      console.log('No user');
      res.send(null);
  }
});

module.exports = router;