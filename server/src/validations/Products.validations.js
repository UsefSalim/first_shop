const Joi = require('joi');

exports.ProductsValidations = (data) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    name: Joi.string().required(),
    image: Joi.string().required(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    user: Joi.string().required(),
  });

  return schema.validate(data);
};
