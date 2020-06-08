const express = require('express');
const multer = require('multer');
const path = require('path');

const controller = require('../controllers/productsController');
const router = express.Router();

const userRoute = require('../middlewares/userRoute');

// Configuramos la subida de archivos
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../../public/images/products'),
    filename: (req, file, cb) => {
        cb(null, 'product-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', controller.index);

router.get('/create', userRoute, controller.create);

// Cuando usamos más de un middleware, tenemos que ponerlos en un array
router.post('/', [userRoute, upload.single('image')], controller.store);

router.get('/cart', (req, res) => {
    res.render('products/cart');
});

router.get('/:id', controller.show);

router.get('/:id/edit', controller.edit);

router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;