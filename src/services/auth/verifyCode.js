const bcrypt = require('bcrypt');

const { ValidationError } = require('../../utils/customError');
// 회원가입 api에 미들웨어로 끼워 넣기

const verifyCode = async (req, res, next) => {
    try {
        const { verificationCode } = req.body;
        const checkVerificationCode = await bcrypt.compare(verificationCode, req.session.verificationCode);
        if (!checkVerificationCode) {
            throw new ValidationError('인증 코드가 일치하지 않습니다.');
        }
        return next();
    } catch(err) {
        return next(err);
    }
}

module.exports = verifyCode;