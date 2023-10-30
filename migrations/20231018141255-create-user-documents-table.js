"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("user_documents", {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      documentSide: {
        type: DataTypes.ENUM("front", "back"),
        defaultValue: "front",
        primaryKey: true,
      },
      document: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      key: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_documents");
  },
};
