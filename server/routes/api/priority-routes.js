const router = require('express').Router();
const connection = require('../../config/connection');

router.get('/', async (req, res) => {
  const query = `SELECT * FROM priority`;

  const result = await dbQuery('GET', { query });
  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  const query = `SELECT * FROM priority WHERE priority.id = ${req.params.id};`;

  const result = await dbQuery('GET', { query });
  res.status(200).json(result);
});

module.exports = router;