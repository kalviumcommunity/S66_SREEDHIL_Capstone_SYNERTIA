// server/src/validation/authValidation.js
const Joi = require("joi");

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required(),
        role: Joi.string().valid("employee", "manager").required()
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required()
    });
    return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
