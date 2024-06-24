const { userModel } = require('../../db/models');
const bcrypt = require('bcrypt');

const { ConflictError } = require('../../utils/customError');

const register = async (req, res, next) => {
    const { email, password, name } = req.body;
    // 이메일 중복 체크
    // 이메일 인증 버튼을 만들 시 해당 api에 복붙
    try {
        const checkExistEmail = await userModel.findByEmail(email);
        if (checkExistEmail) {
            throw new ConflictError('사용 중인 이메일입니다.');
        }
        // 비밀번호 암호화 후 사용자 추가
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await userModel.create({ 
            email, 
            password: hashedPassword, 
            name,
        });
        return res.redirect('/login');
    } catch(err) {
        return next(err);
    }
}

module.exports = register;