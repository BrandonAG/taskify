const router = require('express').Router();
const connection = require('../../config/connection');
const passwordHash = require('../../utils/passwordHash');
const dbQuery = require('../../utils/dbQuery');

router.post('/', async (req, res) => {
  // create new user

  // hash password
  const result = await passwordHash(JSON.stringify({ plaintext_password: req.body.password}));

  if(req.body.username) {
      // try {
      //   const [rows] = await connection.query(
      //     `INSERT INTO user (user_name, user_password)
      //     VALUES (
      //       '${req.body.username}', '${result.hashed_password}'
      //     );`);
        
      //   req.session.user = req.body.username;
      //   req.session.save(function (err) {
      //       if (err) return next(err);
      //       // res.redirect('/');
      //       res.status(200).json({ message: "Success" });
      //   });
      // } catch (error) {
      //   console.error("Error executing queries:", error);
      //   res.status(500).send("An error occurred while executing the database queries.");
      // }

      const query = `INSERT INTO user (user_name, user_password)
          VALUES (
            '${req.body.username}', '${result.hashed_password}'
          );`;

      const result = await dbQuery('POST', { query });
      res.status(200).json(result);
  } else {
      console.log('No user');
      res.send(null);
  }
});

router.get('/:id', async (req, res) => {
  // find one user by its `id` value
  req.session.user = req.body.username;
  if(req.session.user) {
      // try {
      //   const [rows] = await connection.query(
      //     `SELECT id, user_name FROM user WHERE user.id = ${req.params.id};`);

      //   res.status(200).json(rows);
      // } catch (error) {
      //   console.error("Error executing queries:", error);
      //   res.status(500).send("An error occurred while executing the database queries.");
      // }

      const query = `SELECT id, user_name FROM user WHERE user.id = ${req.params.id};`;

      const result = await dbQuery('GET', { query });
      res.status(200).json(result);
  } else {
      console.log('No user');
      res.send(null);
  }
});

router.get('/', async (req, res) => {
  // return logged in user
  if(req.session.user) {
    // try {
    //   const [rows] = await connection.query(
    //     `SELECT id, user_name FROM user WHERE user.user_name = '${req.session.user}';`);
      
    //   res.status(200).json(rows);
    // } catch (error) {
    //   console.error("Error executing queries:", error);
    //   res.status(500).send("An error occurred while executing the database queries.");
    // }

    const query = `SELECT id, user_name FROM user WHERE user.user_name = '${req.session.user}';`;

    const result = await dbQuery('GET', { query });
    res.status(200).json(result);
  } else {
      console.log('No user');
      res.send(null);
  }
});

module.exports = router;