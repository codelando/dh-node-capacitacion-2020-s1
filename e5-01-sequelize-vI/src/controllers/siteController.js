// Require del archivo database>models>index.js
const DB = require('../database/models');
const OP = DB.Sequelize.Op;

module.exports = {
	index: (req, res) => {
		DB.Product
			.findAll()
			.then(productos => {
				return res.send(productos)
			})
			.catch(error => {
				return res.send(error)
			});
		
		// res.render('index');
	},
	
	detail: (req, res) => {
		DB.Product
			.findByPk(req.params.id)
			.then(producto => {
				if (producto) {
					return res.send(producto);
				} 
				return res.send(`No se encontró nada con el ID ${req.params.id}`);
			})
			.catch(error => {
				// Solo para errores de DB
				return res.send(error)
			});
	},
	
	search: (req, res) => {
		DB.Product
			.findAll({
				where: { name: { [OP.like]: `%${req.params.word}%` } }
			})
			.then(producto => {
				return res.send(producto)
			})
			.catch(error => {
				return res.send(error)
			});
	},
};
