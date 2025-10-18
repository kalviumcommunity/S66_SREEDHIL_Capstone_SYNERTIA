// server/src/validation/authValidation.js
const Joi = require("joi");

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(), // Full name with spaces allowed
        email: Joi.string().email().required(),
        role: Joi.string().valid("employee", "manager").required(),
        googleId: Joi.string().optional(),
        isGoogleAuth: Joi.boolean().optional(),
        adminCode: Joi.string().optional()
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(1).max(100).required(), // Name, username, or email
        password: Joi.string().min(1).max(200).required() // Password or email
    });
    return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
