const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/siteController');

router.get('/', controller.index);

router.get('/search/:word', controller.search);

router.get('/detail/:id', controller.detail);

module.exports = router;