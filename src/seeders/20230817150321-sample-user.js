'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      username: 'ZOD',
      email: 'zod@eg.com',
      password: "$2a$12$TzYLJIqSj7T8g8qt8WXbm.DAmsHDfnNJioBZoPSU7yzXfINFi.pLi", //1234
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
