const { Router } = require("express");
const bookingController = require("../controllers/booking.controller");
const bookingValidator = require("../validators/booking.validator");
const bookingSerializer = require("../serializers/booking.serializer");
const genericResponse = require("../helper/generic-response.helper");
const { checkAccessToken } = require("../middlewares/auth");
const router = Router();

router.post(
  "/create-movie-booking",
  checkAccessToken,
  bookingValidator.createMovieBookingSchema,
  bookingController.createMovieBooking,
  genericResponse.sendResponse
);

router.post(
  "/create-concert-booking",
  checkAccessToken,
  bookingValidator.createConcertBookingSchema,
  bookingController.createConcertBooking,
  genericResponse.sendResponse
);

router.get(
  "/booking",
  checkAccessToken,
  bookingController.getBooking,
  bookingSerializer.getBooking,
  genericResponse.sendResponse
);

module.exports = router;
