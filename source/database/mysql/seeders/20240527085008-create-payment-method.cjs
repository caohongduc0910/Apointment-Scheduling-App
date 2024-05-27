'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Payment_methods', [
      {
        payment_method: "Tiền mặt"
      },
      {
        payment_method: "Thẻ tín dụng"
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payment_methods', null, {})
  }
};
