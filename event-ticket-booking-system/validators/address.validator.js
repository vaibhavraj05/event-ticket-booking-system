const Joi = require("joi");
const { validateRequest } = require("../helper/common-functions.helper");

const createAddressSchema = async (req, res, next) => {
  const schema = Joi.object({
    addressName: Joi.string().min(3).required(),
    cityPart: Joi.string().min(3).required(),
    city: Joi.string().min(3).required(),
    state: Joi.string().min(3).required(),
    country: Joi.string().min(3).required(),
    pinCode: Joi.string().min(6).required(),
  });
  validateRequest(req, res, next, schema, "body");
};

module.exports = {
  createAddressSchema,
};
