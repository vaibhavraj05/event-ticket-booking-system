const { commonErrorHandler } = require("../helper/error-handler.helper");
const addressService = require("../services/address.service");

const createAddress = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const response = await addressService.createAddress(payload);
    if (response.error) {
      throw new Error(response.error.message);
    }
    res.data = response;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

const getAddress = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const response = await addressService.getAddress(payload);
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
  createAddress,
  getAddress,
};
