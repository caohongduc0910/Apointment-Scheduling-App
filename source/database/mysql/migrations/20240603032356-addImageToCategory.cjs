
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('categories', 'image', {
      type: Sequelize.TEXT
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('categories', 'image')
  }
};
