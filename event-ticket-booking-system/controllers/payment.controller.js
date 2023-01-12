const { commonErrorHandler } = require("../helper/error-handler.helper");
const paymentService = require("../services/payment.service");

const createPayment = async (req, res, next) => {
  try {
    const { body: payload, params } = req;
    const response = await paymentService.createPayment(payload, req.params);
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
  createPayment,
};
