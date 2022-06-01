'use strict';
module.exports = (sequelize, DataTypes) => {
  const EntreeType = sequelize.define('EntreeType', {
    name: DataTypes.STRING,
    isVegetarian: DataTypes.BOOLEAN
  }, {});
  EntreeType.associate = function(models) {
    EntreeType.hasMany(models.Entree, {
      foreignKey: 'entreeTypeId'
    });
  };
  return EntreeType;
};
