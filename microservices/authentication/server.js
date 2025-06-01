require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Server Setup
const app = express();
const PORT = process.env.PORT || 3001;

// Create a 'connection pool' using the provided credentials
const connection = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : process.env.DB_URL || 'localhost',
    user              : process.env.DB_USER,
    password          : process.env.DB_PW,
    database          : process.env.DB_NAME
}).promise();

app.use(cors({ credentials: true, origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
    // get username and password from request body
    const user = req.body.username;
    const password = req.body.password;

    if (user && password) {
        // check database for user
        try {
            const [row] = await connection.query(
            `SELECT * FROM user WHERE user.user_name = '${user}';`);
            
            // check if username and password match
            if (row[0] !== null) {
                const result = await bcrypt.compare(password, row[0][process.env.PW_FIELD_NAME]);
                res.json({response: result});
            } else {
                res.json({response: 'false'});
            }
        } catch (error) {
            console.error("Error executing queries:", error);
        }
    } else {
        res.json({response: 'false'});
    }

});

// start listening for incoming requests
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});