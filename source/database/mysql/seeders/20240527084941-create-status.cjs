'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Statuses', [
      {
        status_name: "Chờ thanh toán"
      },
      {
        status_name: "Đã thanh toán"
      },
      {
        status_name: "Đã duyệt"
      },
      {
        status_name: "Hoàn thành"
      },
      {
        status_name: "Đã hủy"
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Statuses', null, {});
  }
};
