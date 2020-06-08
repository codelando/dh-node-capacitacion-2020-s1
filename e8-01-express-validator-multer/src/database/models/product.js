'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    thematicId: DataTypes.INTEGER
  }, {});
  product.associate = function(models) {
    product.belongsTo(models.thematic);
    product.belongsToMany(models.tag, {
      through: 'products_tags',
      timestamps: false
    });
  };
  return product;
};

