const bcrypt = require('bcrypt');

const { userModel } = require('../../db/models');
const { ConflictError } = require('../../utils/customError');
const { generateRandomNumbers, sendEmail } = require('../../utils');

const verifyEmail = async (req, res, next) => {
    const { email } = req.body;
    try {
        const foundUser = await userModel.findByEmail(email);
        if (!!foundUser) {
            throw new ConflictError('사용 중인 이메일입니다.');
        }
        const verificationCode = generateRandomNumbers();
        const expirationTime = new Date(Date.now() + 600000);

        const salt = await bcrypt.genSalt(10);
        const hashedVerificationCode = await bcrypt.hash(verificationCode, salt);

        req.session.verificationCode = hashedVerificationCode;
        req.session.cookie.expires = expirationTime;
        
        const verificationMessage = `인증번호: ${verificationCode}\n만료시각: ${expirationTime}`;
        
        const subject = 'Valley-Tales 이메일 인증';
        sendEmail(email, subject, verificationMessage);
        return res.json({ message: "인증번호가 발송되었습니다." });
    } catch(err) {
        next(err);
    }
}

module.exports = verifyEmail;