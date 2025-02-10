const express = require('express');

const usersRouter = require('./login');
const productsRouter = require('./products');

const router = express.Router();

// Utilisation des routes
router.use('/login', usersRouter);
router.use('/products', productsRouter);

module.exports = router;
