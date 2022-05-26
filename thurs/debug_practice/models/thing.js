'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thing = sequelize.define('Thing', {
    nameOfThing: DataTypes.STRING
  }, {});
  Thing.associate = function(models) {
    // associations can be defined here
    Thing.hasMany(models.Users, {foreignKey: 'favoriteThing'})
  };
  return Thing;
};