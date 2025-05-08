const router = require('express').Router();
const { User } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {

    if(req.session.user) {
        console.log(req.session.user);
        // find all categories
        // be sure to include its associated Products
        User.findAll()
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

router.post('/', (req, res) => {
  req.session.user = req.body.username;
  console.log(req.body.username);
  if(req.session.user) {
      console.log(req.session.user);
      // find all categories
      // be sure to include its associated Products
      User.create({ user_name: req.body.username, user_password: req.body.password })
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
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
        // attributes: ['product_name', 'price', 'stock']
      }
    ]
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

module.exports = router;