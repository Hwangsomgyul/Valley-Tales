const { Router } = require('express');
const passport = require('passport');

const router = Router();

const { register, deleteUser, userLogout } = require('../services');

const { loginRequired, validateRegister } = require('../middlewares');

// 비밀번호 변경
// 회원 탈퇴
router.delete('/', loginRequired, deleteUser, userLogout);

// 회원 가입
router.post('/join', validateRegister, register);

// 로그인
// 로그인 자체는 되고 이후 /users를 직접 입력하면 이동도 됩니다.
// 근데 자동으로 리다이렉트가 되지 않습니다...어떻게 해결하면 좋을까요?
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
    })(req, res, next);
})
// 로그아웃
router.post('/logout', loginRequired, userLogout);

module.exports = router;