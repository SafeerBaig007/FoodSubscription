   
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.hasOne(models.Meal, {
        foreignKey: 'menu_id',
        as: 'Menus'
      })
    }
  }
  Menu.init({
    dish: 
    {type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { 
          msg: "Menu field is required",
         }
      }
    },
    date: 
    {type:DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { 
          msg: "Date field is required",
         }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { 
          msg: "Date field is required",
         }
      }
    }
  }, {
    sequelize,
    modelName: 'Menu',
    timestamps: false,
  });
  return Menu;
};