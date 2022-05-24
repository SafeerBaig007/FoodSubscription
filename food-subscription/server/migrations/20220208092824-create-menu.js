'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dish: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price:{
        type : Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      }
    }); 
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Menus');
  }
};