'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class ShowSeat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Booking, {
        foreignKey: "booking_id",
        targetKey:"id"
      });
      this.belongsTo(models.AudiSeat, {
        foreignKey: "audi_seat_id",
        targetKey:"id"
      });
    }
  }
  ShowSeat.init({
    bookingId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "booking",
        key: 'id'
      }
    },
    audiSeatId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "audi_seat",
        key: 'id'
      }
    },
    seatPrice: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    seatStatus: {
      type: Sequelize.ENUM,
      allowNull: false,
      values:['filled','unfilled'],
      defaultValue:'unfilled'
    },
  }, {
    sequelize,
    modelName: 'ShowSeat',
    tableName:'show_seat',
    paranoid:true
  });
  return ShowSeat;
};