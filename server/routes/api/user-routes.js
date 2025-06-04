const router = require('express').Router();
const connection = require('../../config/connection');
const passwordHash = require('../../utils/passwordHash');
const dbQuery = require('../../utils/dbQuery');

router.post('/', async (req, res) => {
  // create new user

  // hash password
  const result = await passwordHash(JSON.stringify({ plaintext_password: req.body.password}));

  if(req.body.username) {
      const query = `INSERT INTO user (user_name, user_password)
          VALUES (
            '${req.body.username}', '${result.hashed_password}'
          );`;

      const result = await dbQuery('POST', { query });
      res.status(200).json(result);
  } else {
      res.send(null);
  }
});

router.get('/', async (req, res) => {
  // return logged in user
  if(req.session.user) {
    const query = `SELECT id, user_name FROM user WHERE user.user_name = '${req.session.user}';`;

    const result = await dbQuery('GET', { query });
    res.status(200).json(result);
  } else {
      res.send(null);
  }
});

module.exports = router;