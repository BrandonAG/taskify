require('dotenv').config()
const express = require('express');
const cors = require('cors');
const connection = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.set('trust proxy', 1) // trust first proxy

app.use(cors({ credentials: true, origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets

app.get("/", async (req, res) => {
    try {
        const [rows] = await connection.query(req.body.query);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.post("/", async (req, res) => {
    try {
        const [rows] = await connection.query(req.body.query);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.put("/", async (req, res) => {
    try {
        const [rows] = await connection.query(req.body.query);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.delete("/", async (req, res) => {
    try {
        const [rows] = await connection.query(req.body.query);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// start listening for incoming requests
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});