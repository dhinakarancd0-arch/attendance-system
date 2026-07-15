const Staff = require("../models/Staff");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// One-time staff registration
const registerStaff = async (req, res) => {
  try {
    const { username, password, name } = req.body;

    const existingStaff = await Staff.findOne({ username });

    if (existingStaff) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = await Staff.create({
      username,
      password: hashedPassword,
      name,
    });

    res.status(201).json({
      success: true,
      message: "Staff registered successfully",
      staff,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Staff login
const loginStaff = async (req, res) => {
  try {
    const { username, password } = req.body;

    const staff = await Staff.findOne({ username });

    if (!staff) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const isMatch = await bcrypt.compare(password, staff.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        id: staff._id,
        username: staff.username,
      },
      process.env.JWT_SECRET || "attendance_secret_key",
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      staff: {
        id: staff._id,
        name: staff.name,
        username: staff.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerStaff,
  loginStaff,
};