const { Router } = require('express');
const passport = require('passport');

const router = Router();

const { register, deleteUser, userLogout, verifyEmail, changePassword, findPassword } = require('../services');

const { loginRequired, validateRegister, validateEmail, validatePassword } = require('../middlewares');

// 비밀번호 변경
router.put('/', loginRequired, validatePassword, changePassword);

// 회원 탈퇴
router.delete('/', loginRequired, deleteUser, userLogout);

// 회원 가입
router.post('/join', validateRegister, register);

// 이메일 중복 방지 겸 인증
// 아직 미구현
// router.post('/email', validateEmail, verifyEmail );

// 비밀번호 찾기
router.post('/password', findPassword);

// 로그인
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
    })(req, res, next);
})
// 로그아웃
router.post('/logout', loginRequired, userLogout);

module.exports = router;