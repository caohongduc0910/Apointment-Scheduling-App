
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('favorite_appointments', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      client_id: {
        type: Sequelize.BIGINT
      },
      appointment_id: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('favorite_appointments');
  }
};