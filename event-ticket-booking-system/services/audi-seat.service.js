const models = require("../models");
const map = new Map();
const set = new Set();
const createAudiSeat = async (payload) => {
  try {
    const audi = await models.Audi.findOne({
      where: { id: payload.audiId },
    });

    if (!audi) {
      throw new Error("Audi does not exists");
    }

    const audiSeat = await models.AudiSeat.findOne({
      where: { audi_id: payload.audiId },
    });

    if (audiSeat) {
      if (set.has(payload.seatNo)) {
        throw new Error("Assign a different seat number");
      } else {
        if (audi.noOfSeats <= map.get(audi.id)) {
          throw new Error("Seats can't be assign to this Auditorium");
        }

        if (map.has(audi.id)) {
          map.set(audi.id, map.get(audi.id) + 1);
        } else {
          map.set(audi.id, 2);
        }
      }
    } else {
      set.clear();
    }

    set.add(payload.seatNo);
    await models.AudiSeat.create(payload);
    return "Audi Seat has successfully created";
  } catch (error) {
    return { data: null, error: error };
  }
};

const getAudiSeat = async (payload) => {
  const audiSeats = await models.AudiSeat.findAll({
    attributes: { exclude: ["deleted_at"] },
    where: {
      audi_id: payload.audiId,
    },
  });
  return audiSeats;
};

module.exports = {
  createAudiSeat,
  getAudiSeat,
};
