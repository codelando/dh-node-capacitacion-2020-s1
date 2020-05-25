const jsonDB = require('../database/jsonDatabase');
const productModel = jsonDB('products');

module.exports = {
    index: (req, res) => {
        const products = productModel.all();

        res.render('products/index', { products });
    },
    show: (req, res) => {
        const product = productModel.find(req.params.id);

        if( product) {
            res.render('products/show', { product });
        } else {
            res.render('products/404');
        }
    },
    create: (req, res) => {        
        res.render('products/create');
    },
    store: (req, res) => {
        const product = req.body;
        product.keywords = req.body.keywords.split(' ');
        
        product.image = req.file ? req.file.filename : '';

        const productId = productModel.create(product);

        res.redirect(`products/${productId}`);
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
    destroy: (req, res) => {
        productModel.delete(req.params.id);

        res.redirect(`/products/`)
    },
    cart: (req, res) => {        
        res.render('products/cart');
    },    
}