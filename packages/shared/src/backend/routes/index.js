const express = require('express');

const dataRouter = require('./data');
const usersRouter = require('./login');

const router = express.Router();

// Utilisation des routes
router.use('/data', dataRouter);
router.use('/login', usersRouter);

module.exports = router;
