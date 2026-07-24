const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getTodayAttendance,
  getAttendanceByDate,
  exportAttendanceExcel,
  getReportStats,
  getStudentAttendance,
} = require("../controllers/attendanceController");

// Mark attendance
router.post("/mark", markAttendance);

// Today's attendance
router.get("/today", getTodayAttendance);

// Attendance by date
router.get("/date/:date", getAttendanceByDate);

// Reports statistics
router.get("/report-stats", getReportStats);

router.get("/student/:registerNumber", getStudentAttendance);

// Export attendance to Excel
router.get("/export/:date", exportAttendanceExcel);

module.exports = router;