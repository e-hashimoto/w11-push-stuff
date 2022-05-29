'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('People', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      age: {
        type: Sequelize.INTEGER
      },
      biography: {
        type: Sequelize.TEXT
      },
      hairColorId: {
        allowNull: false,
        references: {
          model: 'HairColors'
        },
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('People');
  }
};
