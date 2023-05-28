const Joi = require("joi");

module.exports = {
  signup: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(40).required(),
      name: Joi.string().min(2).max(128),
    }),
  },
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(40).required(),
    }),
  },
};
