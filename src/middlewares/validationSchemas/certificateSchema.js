const Joi = require('joi');

const certificateSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "string.empty": "자격증 이름은 공백일 수 없습니다.",
            "any.required": "자격증 이름은 필수값입니다."
        }),
});

module.exports = certificateSchema;