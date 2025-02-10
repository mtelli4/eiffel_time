const express = require('express');

const usersRouter = require('./login');

const router = express.Router();

// Utilisation des routes
router.use('/login', usersRouter);

module.exports = router;
