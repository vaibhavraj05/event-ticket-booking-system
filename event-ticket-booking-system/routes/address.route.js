const { Router } = require("express");
const addressController = require("../controllers/address.controller");
const addressValidator = require("../validators/address.validator");
const addressSerializer = require("../serializers/address.serializer");
const genericResponse = require("../helper/generic-response.helper");
const { verifyUser } = require("../middlewares/user-verification");
const { checkAccessToken } = require("../middlewares/auth");
const router = Router();

router.post(
  "/create-address",
  checkAccessToken,
  verifyUser,
  addressValidator.createAddressSchema,
  addressController.createAddress,
  genericResponse.sendResponse
);

router.get(
  "/address",
  addressController.getAddress,
  addressSerializer.getAddress,
  genericResponse.sendResponse
);

module.exports = router;
