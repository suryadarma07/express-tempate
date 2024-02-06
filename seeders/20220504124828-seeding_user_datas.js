"use strict";
const { hashPassword } = require("../helpers/argon");
const argon = require("argon2");
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        name: "Express",
        username: "express",
        email: "express@gmail.com",
        password: await hashPassword('secret'),
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
