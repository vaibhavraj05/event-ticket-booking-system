const Joi = require("joi");
const { validateRequest } = require("../helper/common-functions.helper");
const createPaymentSchema = async (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().min(0).required(),
    paymentMethod: Joi.string()
      .valid("credit card", "debit card", "upi")
      .label("Seat Type should be [credit card,debit card,upi] only"),
  });
  validateRequest(req, res, next, schema, "body");
};
const createPaymentByParamSchema = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().uuid().required(),
  });
  validateRequest(req, res, next, schema, "params");
};

module.exports = {
  createPaymentSchema,
  createPaymentByParamSchema,
};
