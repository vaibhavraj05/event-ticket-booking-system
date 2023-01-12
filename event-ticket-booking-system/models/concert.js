'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Concert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Event, {
        foreignKey: "event_id",
        targetKey:"id"
      });
      this.belongsTo(models.Audi, {
        foreignKey: "audi_id",
        targetKey:"id"
      });

      this.hasMany(models.Booking, {
        foreignKey:"concert_id",
        sourceKey:"id",
        as:"Booking"
      });
    }
  }
  Concert.init({
    eventId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "event",
        key: 'id'
      }
    },
    audiId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "audi",
        key: 'id'
      }
    },
    concertName: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    concertDuration: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlphanumeric: true,
    },
    concertLanguage: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    concertDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    artistName: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    concertGenre: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
  }, {
    sequelize,
    modelName: 'Concert',
    tableName:'concert',
    paranoid:true
  });
  return Concert;
};