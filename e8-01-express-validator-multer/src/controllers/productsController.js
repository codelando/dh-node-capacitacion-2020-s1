const fs = require('fs');
const path = require('path');
const db = require('../database/models');

module.exports = {
    index: (req, res) => {
        db.product
            .findAll()
            .then(products => {
                res.render('products/index', { products });
            })
            .catch(error => console.log(error));
    },
    show: (req, res) => {
        db.product
            .findByPk(req.params.id, { include: ['thematic', 'tags'] })
            .then(product => {
                if(product) {
                    res.render('products/show', { product });
                } else {
                    res.render('products/404');
                }
            })
            .catch(error => console.log(error));
    },
    create: (req, res) => {
        db.thematic
            .findAll()
            .then(thematics => {
                res.render('products/create', { thematics });
            })
            .catch(error => console.log(error));
    },
    store: (req, res) => {
        product = req.body;
        product.image = req.file ? req.file.filename : '';
        
        db.product
            .create(product)
            .then(storedProduct => {
                //storedProduct.addTags(req.body.keywords.split(' '))
                return res.redirect(`/products/${storedProduct.id}`)
            })
            .catch(error => { console.log(error) });

    },
    edit: (req, res) => {
        const product = db.product.findByPk(req.params.id, { include: ['thematic', 'tags'] });
        const thematics = db.thematic.findAll();


        
        Promise
            .all([product, thematics])
            .then(responses => {
                if(responses[0]) {
                    console.log(responses[0].dataValues);
                    res.render('products/edit', { product: responses[0], thematics: responses[1] });
                } else {
                    res.render('products/404');
                }
            })
            .catch(error => console.log(error));
    },
    update: (req, res) => {

        product = req.body;
        
        product.image = req.params.image ? req.body.image : req.body.oldImage;
        delete product.oldImage;

        // product.keywords = product.keywords.split(' ');
        
        db.product
            .update(product, {
                where: {
                    id: req.params.id
                }
            })
            .then(updatedProduct => {
                // Guardar tags
                // updatedProduct.addTags()
                res.redirect(`/products/${req.params.id}`)
            })
            .catch(error => { console.log(error) })
        
    },
    destroy: (req, res) => {
        db.product
            .findByPk(req.params.id)
            // Si el registro existe
            .then(async product => {
                // Lo borramos
                await db.product.destroy({ where: { id: req.params.id } });
                
                // y además borramos la imagen asociada
                const imagePath = path.resolve(__dirname, '../../public/images/products', product.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }

                // luego volvemos al listado
                res.redirect(`/products/`)
            })
            .catch(error => console.log(error));
    }
}