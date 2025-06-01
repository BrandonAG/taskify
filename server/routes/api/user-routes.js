const router = require('express').Router();
const connection = require('../../config/connection');
const passwordHash = require('../../utils/passwordHash');

router.post('/', async (req, res) => {
  // create new user

  // hash password
  const result = await passwordHash(JSON.stringify({ plaintext_password: req.body.password}));

  console.log(result);
  if(req.body.username) {
    console.log("TRY");
      try {
        const [rows] = await connection.query(
          `INSERT INTO user (user_name, user_password)
          VALUES (
            '${req.body.username}', '${result.hashed_password}'
          );`);
        
        req.session.user = req.body.username;
        req.session.save(function (err) {
            if (err) return next(err);
            console.log(req.session);
            // res.redirect('/');
            res.status(200).json({ message: "Success" });
        });
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
  // find one user by its `id` value
  req.session.user = req.body.username;
  console.log(req.body.username);
  if(req.session.user) {
      try {
        const [rows] = await connection.query(
          `SELECT * FROM user WHERE user.id = ${req.params.id};`);

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

module.exports = router;