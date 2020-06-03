'use strict';
module.exports = (sequelize, DataTypes) => {
	const Color = sequelize.define(
		'Color', 
		{
			name: DataTypes.STRING
		}
	);

	Color.associate = models => {
		Color.belongsToMany(models.Product, {
			as: 'products',
			through: 'colorProduct',
			// foreignKey: 'colorId',
			// otherKey: 'productId'
		});
	};

	return Color;
};