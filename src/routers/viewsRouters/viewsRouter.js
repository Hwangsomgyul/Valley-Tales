const express = require('express');

const { serveStatic } = require('../../services');

const router = express.Router();

router.get('/', (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    // 로그인 했을 때 비밀번호 찾기를 이용한 상태면 비밀번호 변경 페이지로 이동
    // if (req.user.resetPassword) {
    //     return res.redirect('passwordChangePage');
    // }
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