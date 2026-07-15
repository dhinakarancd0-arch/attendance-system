const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const ExcelJS = require("exceljs");

// Mark Attendance
const markAttendance = async (req, res) => {
  try {
    const { registerNumber } = req.body;

    const student = await Student.findOne({ registerNumber });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    const existingAttendance = await Attendance.findOne({
      student: student._id,
      date: today,
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked today",
      });
    }

    const attendance = await Attendance.create({
      student: student._id,
      date: today,
      time: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
      status: "Present",
    });

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Today's Attendance
const getTodayAttendance = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.find({ date: today })
      .populate("student")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Attendance By Date
const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const attendance = await Attendance.find({ date })
      .populate("student")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Export Attendance to Excel
const exportAttendanceExcel = async (req, res) => {
  try {
    const { date } = req.params;

    const attendance = await Attendance.find({ date })
      .populate("student")
      .sort({ createdAt: 1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Attendance");

    worksheet.columns = [
      { header: "Register Number", key: "registerNumber", width: 20 },
      { header: "Name", key: "name", width: 25 },
      { header: "Department", key: "department", width: 20 },
      { header: "Year", key: "year", width: 10 },
      { header: "Date", key: "date", width: 15 },
      { header: "Time", key: "time", width: 15 },
      { header: "Status", key: "status", width: 15 },
    ];

    attendance.forEach((item) => {
      worksheet.addRow({
        registerNumber: item.student.registerNumber,
        name: item.student.name,
        department: item.student.department,
        year: item.student.year,
        date: item.date,
        time: item.time,
        status: item.status,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Attendance_${date}.xlsx`
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};// Reports Statistics
const getReportStats = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const totalMembers = await Student.countDocuments();

    const presentToday = await Attendance.countDocuments({
      date: today,
    });

    const absentToday = totalMembers - presentToday;

    const attendancePercentage =
      totalMembers === 0
        ? 0
        : Number(
            ((presentToday / totalMembers) * 100).toFixed(1)
          );

    // Department statistics
    const departmentStats = await Student.aggregate([
      {
        $group: {
          _id: "$department",
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          department: "$_id",
          count: "$total",
          _id: 0,
        },
      },
    ]);

    res.json({
      success: true,
      totalMembers,
      presentToday,
      absentToday,
      attendancePercentage,
      departmentStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  markAttendance,
  getTodayAttendance,
  getAttendanceByDate,
  exportAttendanceExcel,
  getReportStats,
};