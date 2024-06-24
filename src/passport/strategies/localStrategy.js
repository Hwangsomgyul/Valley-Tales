const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const { userModel } = require('../../db/models');
const { ValidationError } = require('../../utils/customError');

const config = {
    usernameField: 'email',
    passwordField: 'password',
};

const local = new LocalStrategy(config, async (email, password, done) => {
    try {
        const user = await userModel.findByEmail(email);
        if (!user || !!user.deletedAt) {
            throw new ValidationError('이메일 또는 비밀번호를 확인해주세요.');
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new ValidationError('이메일 또는 비밀번호를 확인해주세요.');
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = local;