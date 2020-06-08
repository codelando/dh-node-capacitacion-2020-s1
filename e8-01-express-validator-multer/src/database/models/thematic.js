'use strict';
module.exports = (sequelize, DataTypes) => {
  const thematic = sequelize.define('thematic', {
    name: DataTypes.STRING
  }, {});
  thematic.associate = function(models) {
    // associations can be defined here
  };
  return thematic;
};