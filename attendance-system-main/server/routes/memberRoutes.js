const express = require("express");
const router = express.Router();

const {
  getAllMembers,
  addMember,
  updateMember,
  deleteMember,
  getDashboardStats,
} = require("../controllers/memberController");

// Dashboard Statistics
router.get("/stats", getDashboardStats);

// Get all members
router.get("/", getAllMembers);

// Add member
router.post("/", addMember);

// Update member
router.put("/:id", updateMember);

// Delete member
router.delete("/:id", deleteMember);

module.exports = router;