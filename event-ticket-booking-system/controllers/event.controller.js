const { commonErrorHandler } = require("../helper/error-handler.helper");
const eventService = require("../services/event.service");

const createEvent = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const response = await eventService.createEvent(payload);
    if (response.error) {
      throw new Error(response.error.message);
    }
    res.data = response;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

const getEvent = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const response = await eventService.getEvent(payload);
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
  createEvent,
  getEvent,
};
