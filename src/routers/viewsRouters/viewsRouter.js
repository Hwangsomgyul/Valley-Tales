const express = require('express');

const { serveStatic } = require('../../services');

const router = express.Router();

router.get('/', (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    return res.redirect(`/users/${req.user.userId}`);
});

router.use('/login', (req, res, next) => {
    if (!!req.user) {
        return res.redirect('/');
    }
    return next();
}, serveStatic('login'));

router.use('/join', serveStatic('join'));

module.exports = router;