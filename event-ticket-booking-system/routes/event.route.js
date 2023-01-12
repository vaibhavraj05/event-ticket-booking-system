const { Router } = require("express");
const eventController = require("../controllers/event.controller");
const eventValidator = require("../validators/event.validator");
const genericResponse = require("../helper/generic-response.helper");
const { verifyUser } = require("../middlewares/user-verification");
const { checkAccessToken } = require("../middlewares/auth");
const eventSerializer = require("../serializers/event.serializer");
const router = Router();

router.post(
  "/create-event",
  checkAccessToken,
  verifyUser,
  eventValidator.createEventSchema,
  eventController.createEvent,
  genericResponse.sendResponse
);

router.get(
  "/event",
  eventController.getEvent,
  eventSerializer.getEvent,
  genericResponse.sendResponse
);

module.exports = router;
