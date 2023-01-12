'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Concert, {
        foreignKey:"event_id",
        sourceKey:"id",
        as:"Concert"
      });
      this.hasMany(models.Movie, {
        foreignKey:"event_id",
        sourceKey:"id",
        as:"Movie"
      });
      
    }
  }
  Event.init({
    eventType: {
      type: Sequelize.ENUM,
      allowNull: false,
      values:['concert','movie']
    },
  }, {
    sequelize,
    modelName: 'Event',
    tableName:'event',
    paranoid:true
  });
  return Event;
};