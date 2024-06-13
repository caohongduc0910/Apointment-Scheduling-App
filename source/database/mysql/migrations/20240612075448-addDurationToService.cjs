
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('services', 'duration', {
      type: Sequelize.INTEGER,
      allowNull: false 
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('services', 'duration')
  }
};
