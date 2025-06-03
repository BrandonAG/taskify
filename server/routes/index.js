const router = require('express').Router();
const apiRoutes = require('./api');
const authenticate = require('../utils/authenticate');

router.use('/api', apiRoutes);

router.post('/login', async (req, res) => {
    // authenticate user
    const result = await authenticate(JSON.stringify(req.body));

    if (result.response) {
        req.session.user = req.body.username;

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
    
        req.session.destroy(function (err) {
            if (err) next(err);
            res.redirect('/');
            // res.json({ message: "LOGOUT" });
        });
    });
});

module.exports = router;