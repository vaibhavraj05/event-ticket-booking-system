const Joi = require("joi");
const { validateRequest } = require("../helper/common-functions.helper");
const createShowSeatSchema = async (req, res, next) => {
  const schema = Joi.object({
    audiSeatId: Joi.string().uuid().required(),
    seatPrice: Joi.number().min(0).required(),
  });
  validateRequest(req, res, next, schema, "body");
};
const createShowSeatByParamSchema = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().uuid().required(),
  });
  validateRequest(req, res, next, schema, "params");
};

const getShowSeatSchema = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().uuid().required(),
  });
  validateRequest(req, res, next, schema, "params");
};

module.exports = {
  getShowSeatSchema,
  createShowSeatSchema,
  createShowSeatByParamSchema,
};
