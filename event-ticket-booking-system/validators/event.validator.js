const Joi = require("joi");
const { validateRequest } = require("../helper/common-functions.helper");

const createEventSchema = async (req, res, next) => {
  const schema = Joi.object({
    eventType: Joi.string()
      .valid("concert", "movie")
      .label("User Type should be [concert,movie] only"),
  });
  validateRequest(req, res, next, schema, "body");
};

module.exports = {
  createEventSchema,
};
