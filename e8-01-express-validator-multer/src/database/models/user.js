'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    user.belongsTo(models.category);
    user.hasMany(models.token);
  };
  return user;
};