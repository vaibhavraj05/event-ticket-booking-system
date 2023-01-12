const Joi = require("joi");
const { validateRequest } = require("../helper/common-functions.helper");

const createAudiSchema = async (req, res, next) => {
  const schema = Joi.object({
    theatreName: Joi.string().min(3).required(),
    noOfSeats: Joi.number().min(0).required(),
  });
  validateRequest(req, res, next, schema, "body");
};
const getAudiSchema = async (req, res, next) => {
  const schema = Joi.object({
    theatreName: Joi.string().min(3).required(),
  });
  validateRequest(req, res, next, schema, "body");
};

module.exports = {
  createAudiSchema,
  getAudiSchema,
};
