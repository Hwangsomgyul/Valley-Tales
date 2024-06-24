const Joi = require('joi');

const educationSchema = Joi.object({
    school: Joi.string()
        .required()
        .messages({
            "string.empty": "학교명은 공백일 수 없습니다.",
            "any.required": "학교명은 필수값입니다.",
        }),
    degree: Joi.string()
        .required()
        .messages({
            "string.empty": "학위 정보는 공백일 수 없습니다.",
            "any.required": "학위 정보는 필수값입니다.",
        }),
});

module.exports = educationSchema;