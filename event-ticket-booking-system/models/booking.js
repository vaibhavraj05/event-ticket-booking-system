'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey:"id"
      });
      this.belongsTo(models.Movie, {
        foreignKey: "movie_id",
        targetKey:"id"
      });
      this.belongsTo(models.Concert, {
        foreignKey: "concert_id",
        targetKey:"id"
      });
      this.hasOne(models.Payment, {
        foreignKey:"booking_id",
        sourceKey:"id",
        as:""
      });
      this.hasMany(models.ShowSeat, {
        foreignKey:"booking_id",
        sourceKey:"id",
        as:"ShowSeat"
      });
    }
  }
  Booking.init({
    userId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "user",
        key: 'id'
      }
    },
    movieId: {
      allowNull: true,
      type: Sequelize.UUID,
      references: {
        model: "movie",
        key: 'id'
      }
    },
    concertId: {
      allowNull: true,
      type: Sequelize.UUID,
      references: {
        model: "concert",
        key: 'id'
      }
    },
    isLocked:{
      allowNull: false,
      type: Sequelize.TIME,
    },
    lockTime: {
      allowNull: false,
      type: Sequelize.TIME,
    },
    bookingStatus: {
      type: Sequelize.ENUM,
      allowNull: false,
      values:['booked','pending','failed'],
      defaultValue:'pending'
    },
  }, {
    sequelize,
    modelName: 'Booking',
    tableName:'booking',
    paranoid:true
  });
  return Booking;
};