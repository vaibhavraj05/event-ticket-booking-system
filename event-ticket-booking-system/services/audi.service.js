const models = require("../models");
const map = new Map();
const createAudi = async (payload) => {
  try {
    const theatre = await models.Theatre.findOne({
      where: { theatre_name: payload.theatreName },
    });

    if (!theatre) {
      throw new Error("Theatre does not exists");
    }

    if (theatre.noOfScreens < map.get(theatre.id)) {
      throw new Error("Screen can't be assign to this theatre");
    }

    if (map.has(theatre.id)) {
      map.set(theatre.id, map.get(theatre.id) + 1);
    } else {
      map.set(theatre.id, 2);
    }
    const newPayload = {
      theatreId: theatre.id,
      noOfSeats: payload.noOfSeats,
    };
    await models.Audi.create(newPayload);
    return "Audi has successfully created";
  } catch (error) {
    return { data: null, error: error };
  }
};

const getAudi = async (payload) => {
  const theatre = await models.Theatre.findOne({
    attributes: { exclude: ["deleted_at"] },
    where: {
      theatre_name: payload.theatreName,
    },
  });
  if (!theatre) {
    throw new Error("Theatre does not exists");
  }
  const audi = await models.Audi.findAll({
    attributes: { exclude: ["deleted_at"] },
    where: {
      theatre_id: theatre.id,
    },
  });
  return audi;
};

module.exports = {
  createAudi,
  getAudi,
};
