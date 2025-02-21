"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class violation extends Model {
    static associate(models) {}
  }
  violation.init(
    {
      id: DataTypes.UUID,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "violation",
    }
  );
  return violation;
};
