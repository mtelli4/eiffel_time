const express = require('express');

const allRouter = require('./all');
const dataRouter = require('./data');
const usersRouter = require('./login');
const evaluationRouter = require('./evaluation');
const adminRouter = require('./admin');

const router = express.Router();

// Utilisation des routes
router.use('/all', allRouter);
router.use('/data', dataRouter);
router.use('/login', usersRouter);
router.use('/evaluation', evaluationRouter);
router.use('/admin', adminRouter);

module.exports = router;
