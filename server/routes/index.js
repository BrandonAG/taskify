const router = require('express').Router();
const apiRoutes = require('./api');
// const { User } = require('../models/User');
const connection = require('../config/connection');
const authenticate = require('../utils/authenticate');

router.use('/api', apiRoutes);

// router.get('/', (req, res) => {

//     if(req.session.username) {
//         console.log(req.session.username);
//     } else {
//         console.log('No user');
//     }
//   // find all categories
//   // be sure to include its associated Products
//   User.findAll()
//     .then(dbPostData => res.json(dbPostData))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.post('/login', async (req, res) => {
    // authenticate user
    const result = await authenticate(JSON.stringify(req.body));

    if (result.response) {
        req.session.user = req.body.username;
        console.log(req.headers);

        req.session.save(function (err) {
            if (err) return next(err);
            // res.redirect('/');
            res.json({ message: "Success" });
        });
    } else {
        res.json({ message: "Fail" });
    }

    
});

router.get('/logout', function (req, res, next) {
    req.session.user = null;

    req.session.save(function (err) {
        if (err) next(err);
    
        req.session.regenerate(function (err) {
            if (err) next(err);
            res.redirect('/');
        });
    });
});

module.exports = router;