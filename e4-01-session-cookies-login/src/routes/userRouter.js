const express = require('express');
const multer = require('multer');
const path = require('path');

const controller = require('../controllers/userController');
const router = express.Router();

const userRoute = require('../middlewares/userRoute')
const guestRoute = require('../middlewares/guestRoute')

// Subida de archivos
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../../public/images/users'),
    filename: (req, file, cb) => {
        cb(null, 'users-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/register', guestRoute, controller.register);

router.post('/', guestRoute, upload.single('image'), controller.store);

router.get('/login', guestRoute, controller.login);

router.post('/login', guestRoute, controller.authenticate);

router.post('/logout', userRoute, controller.logout);

router.get('/profile', userRoute, controller.profile);

module.exports = router;