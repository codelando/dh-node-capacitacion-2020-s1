const express = require('express');
const router = express.Router();

const jsonDB = require('../database/jsonDatabase');
const productModel = jsonDB('products');

router.get('/', (req, res) => {
    const products = productModel.all();

    res.render('products/index', { products });
});

module.exports = router;