const { Router } = require("express");
const showController = require("../controllers/show.controller");
const showValidator = require("../validators/show.validator");
const genericResponse = require("../helper/generic-response.helper");
const { checkAccessToken } = require("../middlewares/auth");
const { verifyUser } = require("../middlewares/user-verification");
const router = Router();

router.get(
  "/show-type",
  checkAccessToken,
  verifyUser,
  showValidator.getShowTypeSchema,
  showController.getShowType,
  genericResponse.sendResponse
);
router.post(
  "/show",
  checkAccessToken,
  verifyUser,
  showController.createShow,
  genericResponse.sendResponse
);
router.post(
  "/movie",
  showValidator.getMovieDetailsSchema,
  showController.getMovieDetails,
  genericResponse.sendResponse
);
router.post(
  "/concert",
  showValidator.getConcertDetailsSchema,
  showController.getConcertDetails,
  genericResponse.sendResponse
);
router.delete(
  "/movie",
  checkAccessToken,
  verifyUser,
  showValidator.deleteMovieSchema,
  showController.deleteMovie,
  genericResponse.sendResponse
);
router.delete(
  "/concert",
  checkAccessToken,
  verifyUser,
  showValidator.deleteConcertSchema,
  showController.deleteConcert,
  genericResponse.sendResponse
);
router.patch(
  "/movie",
  checkAccessToken,
  verifyUser,
  showValidator.updateMovieSchema,
  showController.updateMovie,
  genericResponse.sendResponse
);
router.patch(
  "/concert",
  checkAccessToken,
  verifyUser,
  showValidator.updateConcertSchema,
  showController.updateConcert,
  genericResponse.sendResponse
);

module.exports = router;
