const { Router } = require('express');

const { serveStatic } = require('../../services');

const { loginRequired } = require('../../middlewares');

const router = Router();

router.use(loginRequired);

router.get('/users', serveStatic('users'));
router.get('/users/:userId', serveStatic('user'));

module.exports = router;