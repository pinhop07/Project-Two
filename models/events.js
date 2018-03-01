'use strict';
module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define('Events', {
    name: DataTypes.STRING,
    date: DataTypes.STRING,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    location: DataTypes.STRING,
    availableSpots: DataTypes.INTEGER,
    isPending: DataTypes.BOOLEAN,
    isReserved: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Events;
};
