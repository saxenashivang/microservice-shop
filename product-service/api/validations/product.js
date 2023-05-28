const Joi = require("joi");

module.exports = {
  createProduct: {
    body: Joi.object({
      name: Joi.string().min(2).max(128),
      price: Joi.number().integer().min(1).max(2000000),
      description: Joi.string().min(2),
      imageURI: Joi.string().min(10),
    }),
  },
};
