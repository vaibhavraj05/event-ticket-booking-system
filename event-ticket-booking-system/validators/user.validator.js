const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { validateRequest } = require("../helper/common-functions.helper");

const complexityOptions = {
  min: 3,
  max: 16,
};

const loginSchema = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: passwordComplexity(complexityOptions).required(),
  });
  validateRequest(req, res, next, schema, "body");
};

const registrationSchema = async (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().lowercase().required(),
    password: passwordComplexity(complexityOptions).required(),
    contactNo: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .length(10)
      .required(),
    userType: Joi.string()
      .valid("customer", "admin")
      .label("User Type should be [admin,customer] only"),
  });
  validateRequest(req, res, next, schema, "body");
};

const resetPasswordSchema = async (req, res, next) => {
  const schema = Joi.object({
    oldPassword: passwordComplexity(complexityOptions).required(),
    newPassword: passwordComplexity(complexityOptions).required(),
  });
  validateRequest(req, res, next, schema, "body");
};

const forgetPasswordSchema = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().lowercase().required(),
  });
  validateRequest(req, res, next, schema, "body");
};

const resetPasswordByLinkSchema = async (req, res, next) => {
  const schema = Joi.object({
    password: passwordComplexity(complexityOptions).required(),
  });
  validateRequest(req, res, next, schema, "body");
};
module.exports = {
  registrationSchema,
  loginSchema,
  resetPasswordSchema,
  forgetPasswordSchema,
  resetPasswordByLinkSchema,
};
