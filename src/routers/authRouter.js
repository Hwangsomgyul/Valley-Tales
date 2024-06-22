const { Router } = require('express');
const passport = require('passport');

const router = Router();

const { register, deleteUser, userLogout } = require('../services');

const { loginRequired } = require('../middlewares');

// 비밀번호 변경
// 회원 탈퇴
router.delete('/', loginRequired, deleteUser, userLogout);

// 회원 가입
router.post('/join', register);

// 로그인
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users',
    })(req, res, next);
})
// 로그아웃
router.post('/logout', loginRequired, userLogout);

module.exports = router;