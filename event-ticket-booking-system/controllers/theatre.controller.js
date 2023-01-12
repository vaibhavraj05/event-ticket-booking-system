const { commonErrorHandler } = require("../helper/error-handler.helper");
const theatreService = require("../services/theatre.service");

const createTheatre = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const response = await theatreService.createTheatre(payload);
    if (response.error) {
      throw new Error(response.error.message);
    }
    res.data = response;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

const getTheatre = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const response = await theatreService.getTheatre(payload);
    if (response.error) {
      throw new Error(response.error.message);
    }
    res.data = response;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

module.exports = {
  createTheatre,
  getTheatre,
};
