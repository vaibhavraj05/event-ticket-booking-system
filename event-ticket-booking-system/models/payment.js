'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Payment extends Model {
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
    }
  }
  Payment.init({
    bookingId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "booking",
        key: 'id'
      }
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    paymentMethod: {
      type: Sequelize.ENUM,
      allowNull: false,
      values:['credit card','debit card','upi']
    },
  }, {
    sequelize,
    modelName: 'Payment',
    tableName:'payment',
    paranoid:true
  });
  return Payment;
};