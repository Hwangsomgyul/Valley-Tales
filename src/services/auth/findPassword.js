// 비밀번호 찾기 기능
const bcrypt = require('bcrypt');

const { userModel } = require('../../db/models');

const { generateRandomString, sendEmail } = require('../../utils');
const { NotFoundError } = require('../../utils/customError');

const findPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await userModel.findByEmail(email);
        if (!user) {
            throw new NotFoundError('사용자가 존재하지 않습니다.');
        }
        
        const generatedPassword = generateRandomString();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(generatedPassword, salt);
        await userModel.updateById(user.userId, { password: hashedPassword });
        await userModel.updateResetTrue(user.userId);
        
        const passwordMessage = `임시 비밀번호: ${generatedPassword}\n접속 후 즉시 비밀번호를 변경해주세요.`;
        const subject = 'Valley-Tales 비밀번호 찾기';
        sendEmail(email, subject, passwordMessage);
        return res.status(200).json({ message: "이메일이 발송되었습니다." });
    } catch(err) {
        return next(err);
    }
}

module.exports = findPassword;