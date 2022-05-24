'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Meal.belongsTo(models.Menu,{
        foreignKey : 'menu_id',
        onDelete: 'CASCADE',
      })
      Meal.belongsTo(models.Users,{
        foreignKey : 'user_id',
        onDelete: 'CASCADE',
      })
    }
  }
  Meal.init({
    date: {
      type : DataTypes.DATEONLY,
      validate:{
        isNull:{
          msg: 'Date is required'
        }
      }
    },
    menu_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Meal',
    timestamps: true
  });
  return Meal;
};