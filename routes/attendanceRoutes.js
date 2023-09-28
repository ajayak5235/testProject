const express = require('express');
const {
  markAttendance,
  fetchAttendance,
  searchAttendance,
} = require('../controllers/attendanceController');

const router = express.Router();

router.post('/markAttendance', markAttendance);
router.get('/fetchAttendance', fetchAttendance);
router.get('/searchAttendance', searchAttendance);

module.exports = router;
