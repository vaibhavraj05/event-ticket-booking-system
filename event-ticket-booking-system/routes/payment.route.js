const { Router } = require("express");
const paymentController = require("../controllers/payment.controller");
const paymentValidator = require("../validators/payment.validator");
const genericResponse = require("../helper/generic-response.helper");
const { checkAccessToken } = require("../middlewares/auth");
const router = Router();

router.post(
  "/create-payment/:id",
  checkAccessToken,
  paymentValidator.createPaymentByParamSchema,
  paymentValidator.createPaymentSchema,
  paymentController.createPayment,
  genericResponse.sendResponse
);
module.exports = router;
