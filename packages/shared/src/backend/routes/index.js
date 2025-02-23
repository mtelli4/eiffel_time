const express = require('express');

const dataRouter = require('./data');
const usersRouter = require('./login');
const allRouter = require('./all');
const evaluationRouter = require('./evaluation');
const studentRouter = require('./student');
const absenceRouter = require('./absence');
const teacherAttendanceRouter = require('./teacher-attendance');
const adminRouter = require('./admin');
const scheduleRouter = require('./schedule')
const noteRouter = require('./note');
const messagingRouter = require('./messaging');

const router = express.Router();

// Utilisation des routes
router.use('/data', dataRouter);
router.use('/login', usersRouter);
router.use('/all', allRouter);
router.use('/evaluation', evaluationRouter);
router.use('/student', studentRouter);
router.use('/absences', absenceRouter);
router.use('/teacher-attendance', teacherAttendanceRouter);
router.use('/admin', adminRouter);
router.use('/schedule', scheduleRouter);
router.use('/note', noteRouter);
router.use('/messaging', messagingRouter);

module.exports = router;
