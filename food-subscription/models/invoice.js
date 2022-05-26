"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoice.init(
    {
      user_id: DataTypes.INTEGER,
      payment_proof: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      payment_status: DataTypes.ENUM("Pending", "Approved", "Rejected"),
    },
    {
      sequelize,
      modelName: "Invoice",
    }
  );
  return Invoice;
};
