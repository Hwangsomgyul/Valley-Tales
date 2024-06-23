const { userModel } = require('../../db/models');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    // 이메일 형식을 재검증... 일단 안 적은 상황부터
    // 프론트에서 확인하는 로직을 재검증 하려면 추가 작성 필요
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: "잘못된 형식" });
    }
    // 이메일 중복 체크
    const checkExistEmail = await userModel.findByEmail(email);
    if (checkExistEmail) {
        return res.status(409).json({ error: "이미 존재하는 사용자" });
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
}

module.exports = register;