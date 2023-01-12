const { commonErrorHandler } = require("../helper/error-handler.helper");
const bookingService = require("../services/booking.service");

const createMovieBooking = async (req, res, next) => {
  try {
    const { body: payload, user } = req;
    const response = await bookingService.createMovieBooking(payload, req.user);
    if (response.error) {
      throw new Error(response.error.message);
    }
    res.data = response;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};
const createConcertBooking = async (req, res, next) => {
  try {
    const { body: payload, user } = req;
    const response = await bookingService.createConcertBooking(
      payload,
      req.user
    );
    if (response.error) {
      throw new Error(response.error.message);
    }
    res.data = response;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

const getBooking = async (req, res, next) => {
  try {
    const { body: payload, user } = req;
    const response = await bookingService.getBooking(payload, req.user);
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
  createMovieBooking,
  createConcertBooking,
  getBooking,
};
