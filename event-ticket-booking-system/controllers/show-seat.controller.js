const { commonErrorHandler } = require("../helper/error-handler.helper");
const showSeatService = require("../services/show-seat.service");

const createShowSeat = async (req, res, next) => {
  try {
    const { body: payload, params } = req;
    const response = await showSeatService.createShowSeat(payload, req.params);
    if (response.error) {
      throw new Error(response.error.message);
    }
    res.data = response;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

const getShowSeat = async (req, res, next) => {
  try {
    const { body: payload, params } = req;
    const response = await showSeatService.getShowSeat(payload, req.params);
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
  getShowSeat,
  createShowSeat,
};
