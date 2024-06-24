const Joi = require('joi');

const projectSchema = Joi.object({
    title: Joi.string()
        .required()
        .messages({
            "string.empty": "프로젝트명은 공백일 수 없습니다.",
            "any.required": "프로젝트명은 필수값입니다."
        }),
});

module.exports = projectSchema;