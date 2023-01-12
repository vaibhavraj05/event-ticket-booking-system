const { commonErrorHandler } = require("../helper/error-handler.helper");
const userService = require("../services/user.service");

const registration = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await userService.registration(payload);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await userService.loginUser(payload);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { userId: userId } = req.body;
    const refreshToken = req.refreshToken;
    const data = await userService.refreshToken(refreshToken, userId);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { body: payload, user } = req;
    const data = await userService.resetPassword(payload, req.user);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await userService.forgetPassword(payload);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

const resetPasswordByLink = async (req, res, next) => {
  try {
    const { body: payload, params } = req;
    const data = await userService.resetPasswordByLink(payload, req.params);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

module.exports = {
  registration,
  loginUser,
  refreshToken,
  resetPassword,
  forgetPassword,
  resetPasswordByLink,
};
