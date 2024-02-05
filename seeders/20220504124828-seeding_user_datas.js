"use strict";
const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("Users", [
      {
        id: "0189a26d-ef64-09ce-bdb8-2c0c3c1ef5ec",
        name: "Express",
        username: "express",
        email: "express@gmail.com",
        password: hashPassword('secret'),
        phone_number: "08231231231",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", [
      {
        username: "express",
      },
    ]);
  },
};
