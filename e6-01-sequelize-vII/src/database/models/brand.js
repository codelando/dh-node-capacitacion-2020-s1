'use strict';
module.exports = (sequelize, DataTypes) => {
	const Brand = sequelize.define(
		'Brand', 
		{
			name: DataTypes.STRING
		}
	);

	Brand.associate = models => {
		// hasMany
		Brand.hasMany(models.Product, {
			as: 'products', // brand.products[i].name
			foreignKey: 'brandId',
		})
	};

	return Brand;
};