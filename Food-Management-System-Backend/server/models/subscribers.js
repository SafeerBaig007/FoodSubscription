'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscribers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Subscribers.init({
    user_id: DataTypes.INTEGER,
    dish_id: DataTypes.INTEGER,
    dates: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Subscribers',
  });
  return Subscribers;
};