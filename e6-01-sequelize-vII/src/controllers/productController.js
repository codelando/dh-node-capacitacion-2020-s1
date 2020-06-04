const jsonDB = require('../database/jsonDatabase');
const productModel = jsonDB('products');

const { Product, Brand, Color } = require('../database/models');

module.exports = {
    index(req, res) {
        Product
            .findAll({
                include: ['brand'],
            })
            .then(products => {
                return res.render('products/index', { products });
            })
            .catch(error => res.send(error));

    },
    show: (req, res) => {
        Product
            .findByPk(req.params.id, {
                include: ['brand', 'colors'],
            })
            .then(product => {
                if (product) {
                    res.render('products/show', { product });
                } else {
                    res.render('products/404');
                }
            })
            .catch(error => res.send(error));
    },
    create: async (req, res) => {
        let brands = await Brand.findAll();
        let colors = await Color.findAll();
        return res.render('products/create', { brands, colors });
    },

    store: (req, res) => {
        const _body = req.body;
        _body.image = req.file ? req.file.filename : '';
        _body.userId = Math.ceil(Math.random() * 3);

        Product
            .create(req.body)
            .then(productStored => {
                // Asociar los colores que querés al producto creado
                productStored.addColors(req.body.colors);

                return res.redirect(`products/${productStored.id}`);
            })
            .catch(error => res.send(error));
    },

    edit: async (req, res) => {
        let brands = await Brand.findAll();
        let colors = await Color.findAll();
        let product = await Product.findByPk(req.params.id, { include: ['brand', 'colors'] });
        return res.render('products/edit', { product, colors, brands });
    },
    update: (req, res) => {
        let product = req.body;
        
        product.image = req.file ? req.file.filename : req.body.oldImage;

        Product.update(product, {
            where: {id: req.params.id}
        })
        .then(result => {
            return res.redirect(`/products/${req.params.id}`);
        })
        .catch(error => res.send(error));

        
    },
    destroy: async (req, res) => {
        await Product.destroy({ where: {id: req.params.id}});
        res.redirect(`/products/`)
    },
    cart: (req, res) => {        
        res.render('products/cart');
    },    
    test: async (req, res) => {
        let colors = await Color.findAll({ include: ['products'] });
        return res.send(colors);
    }
}