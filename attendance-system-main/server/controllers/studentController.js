const Student = require("../models/Student");

const verifyStudent = async (req, res) => {
  try {
    const { registerNumber, dob } = req.body;

   console.log("Searching for:", registerNumber, dob);

console.log("Collection:", Student.collection.name);

const allStudents = await Student.find();
console.log("All Students:", allStudents);

const student = await Student.findOne({
  registerNumber,
  dob,
});

console.log("Student Found:", student);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Invalid Register Number or Date of Birth",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  verifyStudent,
};