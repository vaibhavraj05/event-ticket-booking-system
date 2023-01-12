const models = require("../models");
const createAddress = async (payload) => {
  try {
    const existingAddress = await models.Address.findOne({
      where: {
        address_name: payload.addressName,
      },
    });
    if (existingAddress) {
      throw new Error("Address already exists");
    }
    const existingCityPart = await models.Address.findOne({
      where: {
        city_part: payload.cityPart,
      },
    });
    if (existingCityPart) {
      throw new Error("Region already exists");
    }
    const existingPinCode = await models.Address.findOne({
      where: {
        pin_code: payload.pinCode,
      },
    });
    if (existingPinCode) {
      throw new Error("Assign different PIN Code");
    }
    const address = await models.Address.create(payload);
    return "address has successfully created";
  } catch (error) {
    return { data: null, error: error };
  }
};

const getAddress = async (payload) => {
  const address = await models.Address.findAll({
    attributes: { exclude: ["deleted_at"] },
  });
  return address;
};
module.exports = {
  createAddress,
  getAddress,
};
