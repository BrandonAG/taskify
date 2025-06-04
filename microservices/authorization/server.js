require('dotenv').config()
const express = require('express');
const cors = require('cors');
const connection = require('./config/connection');

// Server Setup
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ credentials: true, origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/proj-access', async (req, res) => {
    // check if user has access to project
    try {
        const [rows] = await connection.query(
            `SELECT * FROM user_project
            WHERE
                project_id = ${req.body.project_id}
                AND user_id = (SELECT user.id FROM user WHERE user_name = '${req.body.user_name}');`
        );
        if (rows[0]) {
            res.status(200).json({authorized: true});
            if (process.env.DEV_MODE) {
                console.log({authorized: true});
            }
        } else {
            res.status(200).json({authorized: false});
            if (process.env.DEV_MODE) {
                console.log({authorized: false});
            }
        }
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
        if (process.env.DEV_MODE) {
            console.log("An error occurred while executing the database queries.");
        }
    }

});

app.get('/proj-level', async (req, res) => {
    // check if user meets a privilege level
    try {
        const [rows] = await connection.query(
            `SELECT * FROM user_project
            WHERE
                project_id = ${req.body.project_id}
                AND user_id = (SELECT user.id FROM user WHERE user_name = '${req.body.user_name}')
                AND permission_id >= ${req.body.permission_id};`
        );
        if (rows[0] && rows[0].permission_id >= req.body.permission_id) {
            res.status(200).json({authorized: true});
            if (process.env.DEV_MODE) {
                console.log({authorized: true});
            }
        } else {
            res.status(200).json({authorized: false});
            if (process.env.DEV_MODE) {
                console.log({authorized: false});
            }
        }
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
        if (process.env.DEV_MODE) {
            console.log("An error occurred while executing the database queries.");
        }
    }
});

// start listening for incoming requests
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});