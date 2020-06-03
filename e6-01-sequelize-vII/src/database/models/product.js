'use strict';
module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define(
		'Product', 
		{
			name: DataTypes.STRING,
			description: DataTypes.TEXT,
			price: DataTypes.DECIMAL,
			image: DataTypes.STRING,
			keywords: DataTypes.TEXT,
			userId: DataTypes.INTEGER,
			brandId: DataTypes.INTEGER,
		},
		// {
		// 	underscored: true,
		// 	'deletedAt': 'deleted_at',
		// 	paranoid: true,
		// }
	);

	Product.associate = models => {
		// belongsTo
		Product.belongsTo(models.Brand, { as: 'brand' });
		// belongsToMany
		Product.belongsToMany(models.Color, { 
			as: 'colors',
			through: 'colorProduct', 
			// foreignKey: 'productId', 
			// otherKey: 'colorId'
		});
	};

	return Product;
};