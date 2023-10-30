const { DataTypes } = require("sequelize");

("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.UUID,
      },
      mobileNumber: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: null,
        unique: true
      },
      firstName: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      middleName: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "transgender"),
        defaultValue: null,
      },
      maritalStatus: {
        type: DataTypes.ENUM("single", "married", "divorced", "widowed"),
        defaultValue: null,
      },
      dateOfBirth: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      addressLine1: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      addressLine2: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      postCode: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      stateName: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      cityName: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      residenceOwnership: {
        type: DataTypes.ENUM("self-owned", "rented"),
        defaultValue: null,
      },
      otherDetails: {
        type: DataTypes.JSON,
        defaultValue: {},
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

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};
