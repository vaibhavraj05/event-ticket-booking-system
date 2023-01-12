const models = require("../models");
const createTheatre = async (payload) => {
  try {
    const existingTheatre = await models.Theatre.findOne({
      where: { theatre_name: payload.theatreName },
    });
    if (existingTheatre) {
      throw new Error("Theatre already exists");
    }
    const address = await models.Address.findOne({
      where: { address_name: payload.addressName },
    });
    if (!address) {
      throw new Error("Address does not exists");
    }
    const newPayload = {
      theatreName: payload.theatreName,
      addressId: address.id,
      noOfScreens: payload.noOfScreens,
    };
    await models.Theatre.create(newPayload);
    return "Theatre has successfully created";
  } catch (error) {
    return { data: null, error: error };
  }
};

const getTheatre = async (payload) => {
  const theatres = [];
  const cities = await models.Address.findAll({
    attributes: { exclude: ["deleted_at"] },
    where: {
      city: payload.city,
    },
  });
  if (!cities) {
    throw new Error("City does not exists");
  }
  for (let i = 0; i < cities.length; i++) {
    const theatre = await models.Theatre.findOne({
      attributes: { exclude: ["deleted_at"] },
      where: {
        address_id: cities[i].id,
      },
    });
    theatres.push(theatre);
  }
  return theatres;
};

module.exports = {
  createTheatre,
  getTheatre,
};
