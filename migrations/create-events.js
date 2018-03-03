'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date: {
        allowNull: false,
        type: Sequelize.STRING
      },
      startTime: {
        allowNull: false,
        type: Sequelize.STRING
      },
      endTime: {
        allowNull: false,
        type: Sequelize.STRING
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      availableSpots: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      isPending: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.BOOLEAN
      },
      isReserved: {
        allowNull: false,
        defaultValue: 0,
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Events');
  }
};