const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .messages({ 
            "string.empty": "이메일은 공백일 수 없습니다.",
            "string.email": "잘못된 이메일 형식입니다.",
            "any.required": "이메일은 필수값입니다.",
        }),
    name: Joi.string()
        .min(2)
        .required()
        .messages({
          "string.empty": "이름은 공백일 수 없습니다.",
          "string.min": "이름은 최소 2글자 이상입니다.",
          "any.required": "이름은 필수값입니다.",
        }),
});

module.exports = userSchema;