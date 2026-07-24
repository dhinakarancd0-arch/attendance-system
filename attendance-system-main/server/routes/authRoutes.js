const express = require("express");
const router = express.Router();

const {
  registerStaff,
  loginStaff,
} = require("../controllers/authController");

// Register staff (one-time setup)
router.post("/register", registerStaff);

// Login staff
router.post("/login", loginStaff);

module.exports = router;