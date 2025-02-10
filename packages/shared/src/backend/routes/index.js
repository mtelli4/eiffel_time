const express = require('express');

const dataRouter = require('./data');
const usersRouter = require('./login');
const evaluationRouter = require('./evaluation');

const router = express.Router();

// Utilisation des routes
router.use('/data', dataRouter);
router.use('/login', usersRouter);
router.use('/evaluation', evaluationRouter);

module.exports = router;
