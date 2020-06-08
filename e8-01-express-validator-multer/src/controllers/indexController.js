const db = require('../database/models');

module.exports = {
    index: (req, res) => {
        db.product
            .findAll()
            .then(products => {
                res.render('products/index', { products });
            })
            .catch(error => console.log(error));
    }
}