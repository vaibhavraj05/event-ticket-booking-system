const { Router } = require("express");
const audiSeatController = require("../controllers/audi-seat.controller");
const audiSeatValidator = require("../validators/audi-seat.validator");
const audiSeatSerializer = require("../serializers/audi-seat.serializer");
const genericResponse = require("../helper/generic-response.helper");
const { verifyUser } = require("../middlewares/user-verification");
const { checkAccessToken } = require("../middlewares/auth");
const router = Router();

router.post(
  "/create-audi-seat",
  checkAccessToken,
  verifyUser,
  audiSeatValidator.createAudiSeatSchema,
  audiSeatController.createAudiSeat,
  genericResponse.sendResponse
);

router.get(
  "/audi-seat",
  audiSeatValidator.getAudiSeatSchema,
  audiSeatController.getAudiSeat,
  audiSeatSerializer.getAudiSeat,
  genericResponse.sendResponse
);

module.exports = router;
