const express = require('express');

const dataRouter = require('./data');
const usersRouter = require('./signin');
const allRouter = require('./all');
const evaluationRouter = require('./evaluation');
const absenceRouter = require('./absence');
const teacherAttendanceRouter = require('./teacher-attendance');
const adminRouter = require('./admin');
const scheduleRouter = require('./schedule')
const signupRouter = require('./signup')
const noteRouter = require('./note'); 
const averagesRouter = require('./averages');

const router = express.Router();

// Utilisation des routes
router.use('/data', dataRouter);
router.use('/signin', usersRouter);
router.use('/all', allRouter);
router.use('/evaluation', evaluationRouter);
router.use('/absences', absenceRouter);
router.use('/teacher-attendance', teacherAttendanceRouter);
router.use('/admin', adminRouter);
router.use('/schedule', scheduleRouter);
router.use('/note', noteRouter); 
router.use('/averages', averagesRouter);
router.use('/signup', signupRouter)

module.exports = router;
