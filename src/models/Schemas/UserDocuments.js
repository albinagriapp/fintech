const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../database/connection");

const UserDocument = sequelize.define("user_documents", {
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
});

module.exports = UserDocument;
