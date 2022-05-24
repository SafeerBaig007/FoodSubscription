'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany (models.Meal,{
        foreignKey : 'user_id',
        as : 'Subscribers'
      })
      User.hasMany(models.Invoice, {
        foreignKey : 'user_id',
        as : 'Subscribers'
      })
    }
  }
  User.init({
    name: {
      type : DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Date field is required",
         }
      }
    },
    email: {
      type : DataTypes.STRING,
      unique : true,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Date field is required",
         }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Date field is required",
         }
      }
    },
    role: {
      type : DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Date field is required",
         }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
  });
  return User;
};