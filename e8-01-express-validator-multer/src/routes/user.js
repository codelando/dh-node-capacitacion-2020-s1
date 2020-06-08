const express = require('express');
const multer = require('multer');
const path = require('path');

const controller = require('../controllers/usersController');
const router = express.Router();

const guestRoute = require('../middlewares/guestRoute');
const userRoute = require('../middlewares/userRoute');

const validate = require('../validators/usersValidators');

// Configuramos la subida de archivos
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../../public/images/users'),
    filename: (req, file, cb) => {
        cb(null, 'user-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 1024 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'image/png') {
            file.error = "type";
            req.file = file;

            return cb(null, false, new Error('Está mal el mimeType'));
        }
        return cb(null, true);
    }
});

router.get('/register', guestRoute , controller.register);

router.get('/login', guestRoute, controller.login);

router.post('/login', guestRoute, validate.userLogin, controller.autenticate);

router.get('/logout', controller.logout);

router.get('/profile', userRoute, controller.profile);

// Cuando usamos más de un middleware, tenemos que ponerlos en un array
router.post('/', guestRoute, upload.single('image'), validate.userCreate, controller.store);

module.exports = router;