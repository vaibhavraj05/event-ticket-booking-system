const { commonErrorHandler } = require("../helper/error-handler.helper");
const showService = require("../services/show.service");

const getShowType = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await showService.getShowType(payload);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

const createShow = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await showService.createShow(payload);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};
module.exports = {
  createShow,
  getShowType,
};

const getMovieDetails = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await showService.getMovieDetails(payload);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};
const getConcertDetails = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await showService.getConcertDetails(payload);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};
const deleteMovie = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await showService.deleteMovie(payload);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};
const deleteConcert = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await showService.deleteConcert(payload);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};
const updateMovie = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await showService.updateMovie(payload);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};
const updateConcert = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await showService.updateConcert(payload);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};
module.exports = {
  createShow,
  getShowType,
  getMovieDetails,
  getConcertDetails,
  deleteMovie,
  updateMovie,
  deleteConcert,
  updateConcert,
};
