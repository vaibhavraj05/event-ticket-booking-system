const Joi = require("joi");
const { validateRequest } = require("../helper/common-functions.helper");

const createMovieBookingSchema = async (req, res, next) => {
  const schema = Joi.object({
    movieId: Joi.string().uuid().required(),
  });
  validateRequest(req, res, next, schema, "body");
};
const createConcertBookingSchema = async (req, res, next) => {
  const schema = Joi.object({
    concertId: Joi.string().uuid().required(),
  });
  validateRequest(req, res, next, schema, "body");
};

module.exports = {
  createMovieBookingSchema,
  createConcertBookingSchema,
};
