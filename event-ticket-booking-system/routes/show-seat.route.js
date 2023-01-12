const { Router } = require("express");
const showSeatController = require("../controllers/show-seat.controller");
const showSeatValidator = require("../validators/show-seat.validator");
const genericResponse = require("../helper/generic-response.helper");
const { checkAccessToken } = require("../middlewares/auth");
const router = Router();

router.post(
  "/create-show-seat/:id",
  checkAccessToken,
  showSeatValidator.createShowSeatByParamSchema,
  showSeatValidator.createShowSeatSchema,
  showSeatController.createShowSeat,
  genericResponse.sendResponse
);

router.get(
  "/show-seat/:id",
  checkAccessToken,
  showSeatValidator.getShowSeatSchema,
  showSeatController.getShowSeat,
  genericResponse.sendResponse
);

module.exports = router;
