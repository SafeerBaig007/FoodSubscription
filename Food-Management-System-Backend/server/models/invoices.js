'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoices.init({
    user_id: DataTypes.INTEGER,
    dish_id: DataTypes.INTEGER,
    total_meals: DataTypes.INTEGER,
    total_amount: DataTypes.INTEGER,
    proof_payment: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Invoices',
  });
  return Invoices;
};