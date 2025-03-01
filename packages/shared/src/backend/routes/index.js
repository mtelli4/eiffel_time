const express = require('express');

const usersRouter = require('./signin');
const allRouter = require('./all');
const studentRouter = require('./student');
const absenceRouter = require('./absence');
const teacherAttendanceRouter = require('./teacher-attendance');
const adminRouter = require('./admin');
const scheduleRouter = require('./schedule');
const signupRouter = require('./signup');
const classgradesRouter = require('./classgrades');
const messagingRouter = require('./messaging');
const userRouter = require('./user');

const router = express.Router();

// Utilisation des routes
router.use('/signin', usersRouter);
router.use('/all', allRouter);
router.use('/student', studentRouter);
router.use('/absences', absenceRouter);
router.use('/teacher-attendance', teacherAttendanceRouter);
router.use('/admin', adminRouter);
router.use('/schedule', scheduleRouter);
router.use('/classgrades', classgradesRouter);
router.use('/messaging', messagingRouter);
router.use('/signup', signupRouter);
router.use('/user', userRouter);

module.exports = router;
