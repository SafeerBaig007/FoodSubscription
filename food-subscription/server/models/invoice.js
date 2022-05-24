'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.belongsTo(models.Users, {
        foreignKey : 'user_id',
        onDelete: 'CASCADE'
      })

    }
  }
  Invoice.init({
    user_id : DataTypes.INTEGER,
    status: DataTypes.STRING,
    payment_proof: DataTypes.STRING,
    subscription_plan: {
      type : DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Invoice',
    timestamps: false
  });
  return Invoice;
};