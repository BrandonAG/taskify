const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const cors = require('cors');
// import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.set('trust proxy', 1) // trust first proxy

app.use(session({
    secret: 'sessionsecret123',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // set to true for https
        sameSite: false,
        // path: 'http://localhost:3000'
        httpOnly: true
    } 
}));

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('../client/public'))

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
});