require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookie = require("cookie");

// Server Setup
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ credentials: true, origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let sessions = {}

app.post('/auth', async (req, res) => {
    // get username and password from request body
    console.log(req.body);
    const cookies = cookie.parse(req.body.cookie);

    if (cookies['connect.sid']) {
        // add user session info
        sessions[cookies['connect.sid']] = req.body.username;
        res.json({response: 'true'});
    } else {
        res.json({response: 'false'});
    }

});

app.get('/auth', async (req, res) => {
    // get username and password from request body
    const cookies = cookie.parse(req.body.cookie);

    if (cookies['connect.sid']) {
        // check database for user
        console.log(sessions[cookies['connect.sid']]);
        res.json({response: sessions[cookies['connect.sid']]});
    } else {
        res.json({response: 'false'});
    }

});

// start listening for incoming requests
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});