'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Movie extends Model {
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
        foreignKey:"movie_id",
        sourceKey:"id",
        as:"Booking"
      });
    }
  }
  Movie.init({
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
    movieName: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    movieDuration: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlphanumeric: true,
    },
    movieLanguage: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    movieDate: {
      type: Sequelize.DATE,
      allowNull: false
    },

    movieDesc: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    
    movieCrew: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    },
    startTime:{
      allowNull: false,
      type: Sequelize.TIME,
      
    },
    endTime:{
      allowNull: false,
      type: Sequelize.TIME,
    }
  }, {
    sequelize,
    modelName: 'Movie',
    tableName:'movie',
    paranoid:true
  });
  return Movie;
};