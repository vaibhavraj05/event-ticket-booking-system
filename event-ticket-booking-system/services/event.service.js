const models = require("../models");
const createEvent = async (payload) => {
  try {
    const existingEvent = await models.Event.findOne({
      where: { event_type: payload.eventType },
    });
    if (existingEvent) {
      throw new Error("Event already exists");
    }
    const event = await models.Event.create(payload);
    return "event has successfully created";
  } catch (error) {
    return { data: null, error: error };
  }
};

const getEvent = async (payload) => {
  const events = await models.Event.findAll({
    attributes: { exclude: ["deleted_at"] },
  });
  return events;
};

module.exports = {
  createEvent,
  getEvent,
};
