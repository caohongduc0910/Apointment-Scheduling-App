import bcrypt from 'bcrypt'
const salt = await bcrypt.genSalt(10)
const hashed = await bcrypt.hash('123456', salt)

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        email: 'admin@gmail.com',
        fullname: 'ADMIN',
        password: hashed,
        role_id: 1,
        status: 1
      }
    ], {})
  },  

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
