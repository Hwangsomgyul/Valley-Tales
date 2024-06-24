const {
    registerSchema,
    userSchema,
    educationSchema,
    awardSchema,
    certificateSchema,
    projectSchema,
} = require('./validationSchemas');

const validateRegister = async (req, res, next) => {
    const { email, password, name } = req.body;
    try {
        await registerSchema.validateAsync({ email, password, name });
        return next();
    } catch(err) {
        err.statusCode = 400;
        return next(err);
    }
}

const validateUser = async (req, res, next) => {
    const { email, name } = req.body;
    try {
        await userSchema.validateAsync({ email, name });
        return next();
    } catch(err) {
        err.statusCode = 400;
        return next(err);
    }
}

const validateEducation = async (req, res, next) => {
    const { school, degree } = req.body;
    try {
        await educationSchema.validateAsync({ school, degree });
        return next();
    } catch(err) {
        err.statusCode = 400;
        return next(err);
    }
}

const validateAward = async (req, res, next) => {
    const { title } = req.body;
    try {
        await awardSchema.validateAsync({ title });
        return next();
    } catch(err) {
        err.statusCode = 400;
        return next(err);
    }
}

const validateCertificate = async (req, res, next) => {
    const { name } = req.body;
    try {
        await certificateSchema.validateAsync({ name });
        return next();
    } catch(err) {
        err.statusCode = 400;
        return next(err);
    }
}

const validateProject = async (req, res, next) => {
    const { title } = req.body; 
    try {
        await projectSchema.validateAsync({ title });
        return next();
    } catch(err) {
        err.statusCode = 400;
        return next(err);
    }
}

module.exports = {
    validateRegister,
    validateUser,
    validateEducation,
    validateAward,
    validateCertificate,
    validateProject,
};