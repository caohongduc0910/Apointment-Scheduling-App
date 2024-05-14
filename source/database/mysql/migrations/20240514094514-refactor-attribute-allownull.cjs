
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'users',
      'deleted_at',
      {
        allowNull: true,
        type: Sequelize.DATE
      }
    )
    await queryInterface.changeColumn(
      'tokens',
      'deleted_at',
      {
        allowNull: true,
        type: Sequelize.DATE
      }
    )
    await queryInterface.changeColumn(
      'statuses',
      'deleted_at',
      {
        allowNull: true,
        type: Sequelize.DATE
      }
    )
    await queryInterface.changeColumn(
      'services',
      'deleted_at',
      {
        allowNull: true,
        type: Sequelize.DATE
      }
    )
    await queryInterface.changeColumn(
      'roles',
      'deleted_at',
      {
        allowNull: true,
        type: Sequelize.DATE
      }
    )
    await queryInterface.changeColumn(
      'payment_methods',
      'deleted_at',
      {
        allowNull: true,
        type: Sequelize.DATE
      }
    )
    await queryInterface.changeColumn(
      'orders',
      'deleted_at',
      {
        allowNull: true,
        type: Sequelize.DATE
      }
    )
    await queryInterface.changeColumn(
      'notification_types',
      'deleted_at',
      {
        allowNull: true,
        type: Sequelize.DATE
      }
    )
    await queryInterface.changeColumn(
      'notifications',
      'deleted_at',
      {
        allowNull: true,
        type: Sequelize.DATE
      }
    )
    await queryInterface.changeColumn(
      'feedbacks',
      'deleted_at',
      {
        allowNull: true,
        type: Sequelize.DATE
      }
    )
    await queryInterface.changeColumn(
      'discounts',
      'deleted_at',
      {
        allowNull: true,
        type: Sequelize.DATE
      }
    )
    await queryInterface.changeColumn(
      'categories',
      'deleted_at',
      {
        allowNull: true,
        type: Sequelize.DATE
      }
    )
    await queryInterface.changeColumn(
      'appointments',
      'deleted_at',
      {
        allowNull: true,
        type: Sequelize.DATE
      }
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tokens');
  }
};