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
        return res.render('products/create', { brands });
    },

    store: (req, res) => {
        const _body = req.body;
        _body.image = req.file ? req.file.filename : '';
        _body.userId = Math.ceil(Math.random() * 3);

        // return res.send(_body);

        Product
            .create(req.body)
            .then(productStored => {
                res.redirect(`products/${productStored.id}`);
            })
            .catch(error => res.send(error));
    },

    edit: (req, res) => {
        let product = productModel.find(req.params.id);
        
        if(product) {
            product.keywords = product.keywords.join(' ');
            res.render('products/edit', { product });
        } else {
            res.render('products/404');
        }
    },
    update: (req, res) => {
        product = req.body;
        product.id = req.params.id;
        
        product.image = req.file ? req.file.filename : req.body.oldImage;
        delete product.oldImage;

        product.keywords = product.keywords.split(' ');
        
        productId = productModel.update(product);

        res.redirect(`/products/${productId}`)
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