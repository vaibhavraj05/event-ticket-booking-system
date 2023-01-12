const { commonErrorHandler } = require("../helper/error-handler.helper");
const audiService = require("../services/audi.service");

const createAudi = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const response = await audiService.createAudi(payload);
    if (response.error) {
      throw new Error(response.error.message);
    }
    res.data = response;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

const getAudi = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const response = await audiService.getAudi(payload);
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
  createAudi,
  getAudi,
};
