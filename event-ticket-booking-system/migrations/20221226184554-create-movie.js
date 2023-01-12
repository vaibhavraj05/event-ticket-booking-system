'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movie', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      event_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "event",
          key: 'id'
        }
      },
      audi_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "audi",
          key: 'id'
        }
      },
      movie_name: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true
      },
      movie_duration: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlphanumeric: true,
      },
      movie_language: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true
      },
      movie_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      movie_desc: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true
      },
      movie_crew: {
        type: Sequelize.ARRAY(Sequelize.STRING),
		    allowNull: false
      },
      start_time:{
        allowNull: false,
        type: Sequelize.TIME,
        
      },
      end_time:{
        allowNull: false,
        type: Sequelize.TIME,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movie');
  }
};