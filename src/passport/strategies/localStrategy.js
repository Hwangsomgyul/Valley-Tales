const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const { userModel } = require('../../db/models'); // 아직 작성 안 됨

const config = {
    usernameField: 'email',
    passwordField: 'password',
};

const local = new LocalStrategy(config, async (email, password, done) => {
    try {
        const user = await userModel.findByEmail(email);
        if (!user || !!user.deletedAt) {
            const err = new Error('이메일 또는 비밀번호를 확인해주세요.');
            err.statusCode = 400;
            throw err;
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            const err = new Error('이메일 또는 비밀번호를 확인해주세요.');
            err.statusCode = 400;
            throw err;
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = local;