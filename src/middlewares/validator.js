const Joi = require('joi');

const {
    registerSchema,
    userSchema,
    educationSchema,
    awardSchema,
    certificateSchema,
    projectSchema,
} = require('./validationSchemas');
const { ValidationError } = require('../utils/customError');

const validateRegister = async (req, res, next) => {
    const { email, password, name } = req.body;
    try {
        await registerSchema.validateAsync({ email, password, name });
        return next();
    } catch(err) {
        return next(new ValidationError(err.message));
    }
}

const validateUser = async (req, res, next) => {
    const { email, name } = req.body;
    try {
        await userSchema.validateAsync({ email, name });
        return next();
    } catch(err) {
        return next(new ValidationError(err.message));
    }
}

const validateEducation = async (req, res, next) => {
    const { school, degree } = req.body;
    try {
        await educationSchema.validateAsync({ school, degree });
        return next();
    } catch(err) {
        return next(new ValidationError(err.message));
    }
}

const validateAward = async (req, res, next) => {
    const { title } = req.body;
    try {
        await awardSchema.validateAsync({ title });
        return next();
    } catch(err) {
        return next(new ValidationError(err.message));
    }
}

const validateCertificate = async (req, res, next) => {
    const { name } = req.body;
    try {
        await certificateSchema.validateAsync({ name });
        return next();
    } catch(err) {
        return next(new ValidationError(err.message));
    }
}

const validateProject = async (req, res, next) => {
    const { title } = req.body; 
    try {
        await projectSchema.validateAsync({ title });
        return next();
    } catch(err) {
        return next(new ValidationError(err.message));
    }
}

const validateEmail = async (req, res, next) => {
    const { email } = req.body;
    try {
        const emailSchema = Joi.string().email({ minDomainSegments: 2 }).required().messages({ 
            "string.empty": "이메일은 공백일 수 없습니다.",
            "string.email": "잘못된 이메일 형식입니다.",
            "any.required": "이메일은 필수값입니다.",
        });
        await emailSchema.validateAsync(email);
        return next();
    } catch(err) {
        return next(new ValidationError(err.message));
    }
}

const validatePassword = async (req, res, next) => {
    const { newPassword } = req.body;
    try {
        const passwordSchema = Joi.string().min(4).required().messages({
            "string.empty": "비밀번호는 공백일 수 없습니다.",
            "string.min": "비밀번호는 최소 4글자 이상입니다.",
            "any.required": "비밀번호는 필수값입니다."
        });
        await passwordSchema.validateAsync(newPassword);
        return next();
    } catch(err) {
        return next(new ValidationError(err.message));
    }
}

module.exports = {
    validateRegister,
    validateUser,
    validateEducation,
    validateAward,
    validateCertificate,
    validateProject,
    validateEmail,
    validatePassword,
};