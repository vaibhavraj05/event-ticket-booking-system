const Joi = require("joi");
const { validateRequest } = require("../helper/common-functions.helper");

const createTheatreSchema = async (req, res, next) => {
  const schema = Joi.object({
    theatreName: Joi.string().min(3).required(),
    addressName: Joi.string().required(),
    noOfScreens: Joi.number().min(0).required(),
  });
  validateRequest(req, res, next, schema, "body");
};
const getTheatreSchema = async (req, res, next) => {
  const schema = Joi.object({
    city: Joi.string().min(3).required(),
  });
  validateRequest(req, res, next, schema, "body");
};

module.exports = {
  createTheatreSchema,
  getTheatreSchema,
};
