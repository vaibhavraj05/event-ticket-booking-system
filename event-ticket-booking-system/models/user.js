'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Booking, {
        foreignKey:"user_id",
        sourceKey:"id",
        as:"Booking"
      });
    }
  }
  User.init({
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlphanumeric: true,
    },
    contactNo:{
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isNumeric:true
      }
    },
    userType: {
      type: Sequelize.ENUM,
      allowNull: false,
      values:['admin','customer','guest'],
      defaultValue:'customer'
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName:'user',
    paranoid:true

  });
  return User;
};