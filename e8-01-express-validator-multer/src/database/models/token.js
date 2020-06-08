'use stict';
module.exports = (sequelize, DataTypes) => {
  const token = sequelize.define('token', {
    token: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  token.associate = function(models) {
    token.belongsTo(models.user);
  };
  return token;
};