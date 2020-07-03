// Validate usernames and passwords
const Joi = require("@hapi/joi");
const schema = Joi.object({
    displayName: Joi.string().alphanum().max(20).required(),
    password: Joi.string().min(8).required(),
});

module.exports = schema;
