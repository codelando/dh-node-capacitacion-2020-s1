const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const controller = require('../controllers/productController');

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../../public/images/products'),
    filename: (req, file, cb) => {
        cb(null, 'product-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/test', controller.test);

// Listado de productos (GET)
router.get('/', controller.index);

// Formulario de creación de productos (GET)
router.get('/cart', controller.cart);

// Formulario de creación de productos (GET)
router.get('/create', controller.create);

// Detalle de un producto particular (GET)
router.get('/:id', controller.show);

// Acción de creación (a donde se envía el formulario) (POST)
router.post('/', upload.single('image'), controller.store);

// Formulario de edición de productos (GET)
router.get('/:id/edit', controller.edit);

// Acción de edición (a donde se envía el formulario) (PUT)
router.put('/:id', upload.single('image'), controller.update);

// Acción de borrado (DELETE)
router.delete('/:id', controller.destroy);


module.exports = router;