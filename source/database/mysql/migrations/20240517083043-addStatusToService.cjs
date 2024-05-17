
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('services', 'status', {
      type: Sequelize.BOOLEAN,
      allowNull: false // or false based on your requirements
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('services', 'status')
  }
};
