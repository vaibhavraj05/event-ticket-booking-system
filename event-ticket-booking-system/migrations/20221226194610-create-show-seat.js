'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('show_seat', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      booking_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "booking",
          key: 'id'
        }
      },
      audi_seat_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "audi_seat",
          key: 'id'
        }
      },
      seat_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      seat_status: {
        type: Sequelize.ENUM,
        allowNull: false,
        values:['filled','unfilled'],
        defaultValue:'unfilled'
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
    await queryInterface.dropTable('show_seat');
  }
};