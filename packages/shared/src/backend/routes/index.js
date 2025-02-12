const express = require('express');

const dataRouter = require('./data');
const usersRouter = require('./login');
const allRouter = require('./all');
const evaluationRouter = require('./evaluation');
const absenceRouter = require('./absence');
const teacherAttendanceRouter = require('./teacher-attendance');
const adminRouter = require('./admin');

const router = express.Router();

// Utilisation des routes
router.use('/data', dataRouter);
router.use('/login', usersRouter);
router.use('/all', allRouter);
router.use('/evaluation', evaluationRouter);
router.use('/absence', absenceRouter);
router.use('/teacher-attendance', teacherAttendanceRouter);
router.use('/admin', adminRouter);

module.exports = router;
