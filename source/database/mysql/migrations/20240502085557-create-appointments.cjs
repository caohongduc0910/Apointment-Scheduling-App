
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
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
    await queryInterface.dropTable('appointments');
  }
};