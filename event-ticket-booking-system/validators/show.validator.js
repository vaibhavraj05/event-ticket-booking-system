const Joi = require("joi");
const { validateRequest } = require("../helper/common-functions.helper");

const getShowTypeSchema = async (req, res, next) => {
  const schema = Joi.object({
    eventId: Joi.string().uuid().required(),
  });
  validateRequest(req, res, next, schema, "body");
};
const getMovieDetailsSchema = async (req, res, next) => {
  const schema = Joi.object({
    pinCode: Joi.string().required(),
  });
  validateRequest(req, res, next, schema, "body");
};
const getConcertDetailsSchema = async (req, res, next) => {
  const schema = Joi.object({
    pinCode: Joi.string().required(),
  });
  validateRequest(req, res, next, schema, "body");
};
const deleteMovieSchema = async (req, res, next) => {
  const schema = Joi.object({
    movieId: Joi.string().uuid().required(),
  });
  validateRequest(req, res, next, schema, "body");
};
const updateMovieSchema = async (req, res, next) => {
  const schema = Joi.object({
    movieId: Joi.string().uuid().required(),
    movieName: Joi.string().min(3).required(),
    movieLanguage: Joi.string().min(3).required(),
    movieDate: Joi.date().iso().required(),
    movieDuration: Joi.string().min(3).required(),
    movieDesc: Joi.string().min(3).required(),
    movieCrew: Joi.array().items(Joi.string()).required(),
    startTime: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})\:([0-9]{2})$/)
      .required(),
    endTime: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})\:([0-9]{2})$/)
      .required(),
  });
  validateRequest(req, res, next, schema, "body");
};
const deleteConcertSchema = async (req, res, next) => {
  const schema = Joi.object({
    concertId: Joi.string().uuid().required(),
  });
  validateRequest(req, res, next, schema, "body");
};
const updateConcertSchema = async (req, res, next) => {
  const schema = Joi.object({
    concertId: Joi.string().uuid().required(),
    concertName: Joi.string().min(3).required(),
    concertLanguage: Joi.string().min(3).required(),
    concertDate: Joi.date().iso().required(),
    concertDuration: Joi.string().min(3).required(),
    artistName: Joi.string().min(3).required(),
    concertGenre: Joi.string().min(3).required(),
  });
  validateRequest(req, res, next, schema, "body");
};

module.exports = {
  getShowTypeSchema,
  getMovieDetailsSchema,
  getConcertDetailsSchema,
  deleteMovieSchema,
  updateMovieSchema,
  deleteConcertSchema,
  updateConcertSchema,
};
