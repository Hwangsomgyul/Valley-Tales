const express = require('express');

const { serveStatic } = require('../../services');

const router = express.Router();

router.get('/', (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    return res.redirect('/users');
});
router.use('/login', serveStatic('login'));
router.use('/join', serveStatic('join'));

module.exports = router;