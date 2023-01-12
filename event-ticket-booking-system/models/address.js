'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.hasMany(models.Theatre, {
        foreignKey:"address_id",
        sourceKey:"id",
        as:"Theatre"
      });
    }
  }
  Address.init({
    addressName: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    cityPart: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    pinCode: {
      type: Sequelize.STRING,
      allowNull: false,
      validate:{
        isNumeric:true
      }
    },
  }, {
    sequelize,
    modelName: 'Address',
    tableName:'address',
    paranoid:true
  });
  return Address;
};