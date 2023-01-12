const { commonErrorHandler } = require("../helper/error-handler.helper");
const audiSeatService = require("../services/audi-seat.service");

const createAudiSeat = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const response = await audiSeatService.createAudiSeat(payload);
    if (response.error) {
      throw new Error(response.error.message);
    }
    res.data = response;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

const getAudiSeat = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const response = await audiSeatService.getAudiSeat(payload);
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
  createAudiSeat,
  getAudiSeat,
};
