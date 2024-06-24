const Joi = require('joi');

const awardSchema = Joi.object({
    title: Joi.string()
        .required()
        .messages({
            "string.empty": "수상명은 공백일 수 없습니다.",
            "any.required": "수상명은 필수값입니다."
        }),
});

module.exports = awardSchema;