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
        const verificationNumbers = generateRandomNumbers();
        const verificationMessage = `인증번호: ${verificationNumbers}`;
        const subject = 'Valley-Tales 이메일 인증';
        sendEmail(email, subject, verificationMessage);
        return res.json({ message: "인증번호가 발송되었습니다." });
    } catch(err) {
        next(err);
    }
}

module.exports = verifyEmail;