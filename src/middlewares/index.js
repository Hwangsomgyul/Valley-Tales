const loginRequired = require('./loginRequired');
const imageUploader = require('./imageUploader');
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
    imageUploader,

    validateRegister,
    validateUser,
    validateEducation,
    validateAward,
    validateCertificate,
    validateProject,
    validateEmail,
    validatePassword,
};