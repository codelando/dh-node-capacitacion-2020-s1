module.exports = (sequelize, DataTypes) => {
	const product = sequelize.define(
		// Nombre del modelo
		'Product',
		// Los atributos del modelo
		{
			name: {
				type: DataTypes.STRING,
				dafaultValue: 'Pepinito'
			},
			price: DataTypes.DECIMAL,
			image: DataTypes.STRING,
			userId: DataTypes.INTEGER,
			brandId: DataTypes.INTEGER,
		},
		// Configuraciones adicionales
		{
			// tableName: 'products',
			// timestamps: false, 
			// createdAt: 'created_at',
			// updatedAt: 'updated_at',
			paranoid: true, // Soft Deletes
		}
	);

	return product;
};
