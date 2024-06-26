const bcrypt = require('bcrypt');

const { userModel } = require('../../db/models');
const { ValidationError } = require('../../utils/customError');

const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const { password } = await userModel.findById(req.user.userId);
        const isPasswordCorrect = await bcrypt.compare(oldPassword, password);
        if (!isPasswordCorrect) {
            throw new ValidationError('비밀번호가 틀렸습니다.');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await userModel.updateById(req.user.userId, { password: hashedPassword });
        await userModel.updateResetFalse(req.user.userId);
        return res.redirect('/');
    } catch(err) {
        return next(err);
    }
}

module.exports = changePassword;