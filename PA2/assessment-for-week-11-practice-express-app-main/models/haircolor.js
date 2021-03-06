'use strict';
module.exports = (sequelize, DataTypes) => {
  const HairColor = sequelize.define('HairColor', {
    color: DataTypes.STRING
  }, {});
  HairColor.associate = function(models) {
    HairColor.hasMany(models.Person, {
      foreignKey: 'hairColorId'
    })
  };
  return HairColor;
};
