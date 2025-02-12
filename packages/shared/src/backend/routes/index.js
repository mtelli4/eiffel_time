const express = require('express');

const dataRouter = require('./data');
const usersRouter = require('./login');
const allRouter = require('./all');
const evaluationRouter = require('./evaluation');
const teacherAttendanceRouter = require('./teacher-attendance');
const adminRouter = require('./admin');
const scheduleRouter = require('./schedule')

const router = express.Router();

// Utilisation des routes
router.use('/data', dataRouter);
router.use('/login', usersRouter);
router.use('/all', allRouter);
router.use('/evaluation', evaluationRouter);
router.use('/teacher-attendance', teacherAttendanceRouter);
router.use('/admin', adminRouter);
router.use('/schedule', scheduleRouter)

module.exports = router;
