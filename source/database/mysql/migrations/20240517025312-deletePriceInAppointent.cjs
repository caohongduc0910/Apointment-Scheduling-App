module.exports = {
  async up (queryInterface, Sequelize) {
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('appointments', 'price');
  }
};
