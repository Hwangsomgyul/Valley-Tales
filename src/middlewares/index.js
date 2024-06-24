const loginRequired = require('./loginRequired');
const {
    validateRegister,
    validateUser,
    validateEducation,
    validateAward,
    validateCertificate,
    validateProject,
    validateEmail,
    validatePassword,
} = require('./validator');

module.exports = {
    loginRequired,

    validateRegister,
    validateUser,
    validateEducation,
    validateAward,
    validateCertificate,
    validateProject,
    validateEmail,
    validatePassword,
};