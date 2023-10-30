const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../database/connection");
const { OCCUPATION_TYPE } = require("../../constants/default.constants");

const UserOccupation = sequelize.define("user_occupation_details", {
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
});

module.exports = UserOccupation;
