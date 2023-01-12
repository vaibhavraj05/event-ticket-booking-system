'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "user",
          key: 'id'
        }
      },
      movie_id: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: "movie",
          key: 'id'
        }
      },
      concert_id: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: "concert",
          key: 'id'
        }
      },
      is_locked:{
        allowNull: false,
        type: Sequelize.TIME,
      },
      lock_time: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      booking_status: {
        type: Sequelize.ENUM,
        allowNull: false,
        values:['booked','pending','failed'],
        defaultValue:'pending'
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
    await queryInterface.dropTable('booking');
  }
};