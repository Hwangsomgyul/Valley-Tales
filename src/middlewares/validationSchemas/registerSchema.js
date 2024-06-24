const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .messages({ 
            "string.empty": "이메일은 공백일 수 없습니다.",
            "string.email": "잘못된 이메일 형식입니다.",
            "any.required": "이메일은 필수값입니다.",
        }),
    password: Joi.string()
        .min(4)
        .required()
        .messages({
            "string.empty": "비밀번호는 공백일 수 없습니다.",
            "string.min": "비밀번호는 최소 4글자 이상입니다.",
            "any.required": "비밀번호는 필수값입니다."
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

module.exports = registerSchema;