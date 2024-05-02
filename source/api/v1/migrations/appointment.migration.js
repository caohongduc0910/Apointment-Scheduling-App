'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      uuid: {
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      },
      time: {
        type: Sequelize.DATE
      },
      status_id: {
        type: Sequelize.BIGINT
      },
      service_id: {
        type: Sequelize.BIGINT
      },
      method: {
        type: Sequelize.BOOLEAN
      },
      url: {
        type: Sequelize.TEXT
      },
      client_id: {
        type: Sequelize.BIGINT
      },
      provider_id: {
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Appointments');
  }
};