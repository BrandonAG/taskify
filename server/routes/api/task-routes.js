const router = require('express').Router();
const { Task } = require('../../models');

// The `/api/categories` endpoint

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Task.findOne({
    where: {
      id: req.params.id
    },
  })
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
  console.log("post");
  if(req.session.user) {
      console.log(req.session.user);
      // find all categories
      // be sure to include its associated Products
      Task.sequelize.query(`INSERT INTO task ( task_name, task_description, project_id, assigned_to_id, priority_id, status_id )
VALUES (
  '${req.body.task_name}',
  '${req.body.task_description}',
  ${req.body.project_id},
  (SELECT id FROM user WHERE user_name = '${req.session.user}'),
  ${req.body.priority_id},
  ${req.body.status_id}
);`)
      .then(dbPostData => {
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