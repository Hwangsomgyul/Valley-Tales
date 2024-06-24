// 로그인을 확인하는 미들웨어 - 기능을 추가한다면 권한을 확인하는 미들웨어도 추가해주는 것이 좋을 듯
// user가 있으면 로그인 된 것, user가 없으면 로그아웃
const { UnauthenticatedError } = require('../utils/customError');

const loginRequired = (req, res, next) => {
    if (!req.user) {
        return next(new UnauthenticatedError('로그인이 필요합니다.'));
    }
    return next();
}

module.exports = loginRequired;