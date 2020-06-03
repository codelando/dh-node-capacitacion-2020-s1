const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/register', (req, res, next) => res.status(503).render('503'), controller.register);

router.get('/login', controller.login);

module.exports = router;