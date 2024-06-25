// 비밀번호 찾기 기능
const bcrypt = require('bcrypt');

const { userNotFound, generateRandomNumbers, sendEmail } = require('../../utils');

const findPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await findByEmail(email);
        userNotFound(user);
        
        const generatedPassword = generateRandomNumbers(10);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(generatedPassword, salt);
        await userModel.updateById(user.userId, { password: hashedPassword });
        
        const passwordMessage = `임시 비밀번호: ${generatedPassword}\n접속 후 즉시 비밀번호를 변경해주세요.`;
        const subject = 'Valley-Tales 비밀번호 찾기';
        sendEmail();
    } catch(err) {
        return next(err);
    }
}

module.exports = findPassword;