
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('services', 'image', {
      type: Sequelize.TEXT,
      allowNull: true // or false based on your requirements
    })
  },

  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('services', 'price', {
      type: Sequelize.DOUBLE,
      allowNull: false // or false based on your requirements
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('services', 'image')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('services', 'price')
  },
};
