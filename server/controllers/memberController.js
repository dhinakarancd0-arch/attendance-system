const Student = require("../models/Student");

// Get all members
const getAllMembers = async (req, res) => {
  try {
    const members = await Student.find().sort({ registerNumber: 1 });

    res.status(200).json({
      success: true,
      count: members.length,
      members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add member
const addMember = async (req, res) => {
  try {
    const { registerNumber, name, dob, department, year } = req.body;

    const existingMember = await Student.findOne({ registerNumber });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: "Register Number already exists",
      });
    }

    const member = await Student.create({
      registerNumber,
      name,
      dob,
      department,
      year,
    });

    res.status(201).json({
      success: true,
      message: "Member added successfully",
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update member
const updateMember = async (req, res) => {
  try {
    const member = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member updated successfully",
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete member
const deleteMember = async (req, res) => {
  try {
    const member = await Student.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalMembers = await Student.countDocuments();

    res.status(200).json({
      success: true,
      totalMembers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllMembers,
  addMember,
  updateMember,
  deleteMember,
  getDashboardStats,
};