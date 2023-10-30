"use strict";

const { DataTypes } = require("sequelize");
const { OCCUPATION_TYPE } = require("../src/constants/default.constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("user_occupation_details", {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      occupationType: {
        type: DataTypes.ENUM(Object.values(OCCUPATION_TYPE)),
      },
      organisation: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      revenue: {
        type: DataTypes.STRING,
        defaultValue: "0",
      },
      experience: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      ongoingEMI: {
        type: DataTypes.STRING,
        defaultValue: "0",
      },
      otherDetails: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      desiredLimit: {
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
    await queryInterface.dropTable("user_occupation_details");
  },
};
