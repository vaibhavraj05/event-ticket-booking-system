const { Router } = require("express");
const userController = require("../controllers/user.controller");
const userValidator = require("../validators/user.validator");
const genericResponse = require("../helper/generic-response.helper");
const { checkRefreshToken, checkAccessToken } = require("../middlewares/auth");
const router = Router();

router.post(
  "/register",
  userValidator.registrationSchema,
  userController.registration,
  genericResponse.sendResponse
);
router.post(
  "/login",
  userValidator.loginSchema,
  userController.loginUser,
  genericResponse.sendResponse
);
router.get(
  "/refresh-token",
  checkRefreshToken,
  userController.refreshToken,
  genericResponse.sendResponse
);

router.patch(
  "/reset-password",
  checkAccessToken,
  userValidator.resetPasswordSchema,
  userController.resetPassword,
  genericResponse.sendResponse
);

router.patch(
  "/forget-password",
  userValidator.forgetPasswordSchema,
  userController.forgetPassword,
  genericResponse.sendResponse
);
router.patch(
  "/reset-password/:id",
  userValidator.resetPasswordByLinkSchema,
  userController.resetPasswordByLink,
  genericResponse.sendResponse
);

module.exports = router;
