
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('feedbacks', {
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
      content: {
        type: Sequelize.TEXT
      },
      image_url: {
        type: Sequelize.TEXT
      },
      rating: {
        type: Sequelize.INTEGER
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
      deleted_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('feedbacks');
  }
};