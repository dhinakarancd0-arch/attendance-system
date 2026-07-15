const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const memberRoutes = require("./routes/memberRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Attendance API is running...");
});

module.exports = app;