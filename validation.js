// Validate usernames and passwords
const Joi = require("@hapi/joi");
const schema = Joi.object({
    displayName: Joi.string().alphanum().max(20).required(),
    password: Joi.string().min(8).required(),
});

// const validateUserDetails = (body) => {
//     const { error } = schema.validate(body, schema);
//     return error;
// };

module.exports = schema;
