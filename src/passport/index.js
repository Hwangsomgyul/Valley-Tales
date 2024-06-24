const passport = require('passport');

const local = require('./strategies/localStrategy');
const { userModel } = require('../db/models');

module.exports = () => {
    passport.use(local);

    passport.serializeUser((user, done) => {
        done(null, user.userId);
    });

    passport.deserializeUser(async (userId, done) => {
        const user = await userModel.findById(userId);
        done(null, user);
    });
};