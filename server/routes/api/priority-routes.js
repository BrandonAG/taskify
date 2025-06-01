const router = require('express').Router();
const connection = require('../../config/connection');

router.get('/', async (req, res) => {
  // find all priorities
  try {
    const [rows] = await connection.query(`SELECT * FROM priority`);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing queries:", error);
    res.status(500).send("An error occurred while executing the database queries.");
  }
});

router.get('/:id', async (req, res) => {
  // find one priority by its `id` value
  try {
    const [rows] = await connection.query(`SELECT * FROM priority WHERE priority.id = ${req.params.id};`);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing queries:", error);
    res.status(500).send("An error occurred while executing the database queries.");
  }
});

module.exports = router;