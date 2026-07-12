const Attendance = require("../models/Attendance");
const Student = require("../models/Student");

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

    const now = new Date();

    const attendance = await Attendance.create({
      student: student._id,
      date: now.toISOString().split("T")[0],
      time: now.toLocaleTimeString("en-IN", {
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

module.exports = {
  markAttendance,
};