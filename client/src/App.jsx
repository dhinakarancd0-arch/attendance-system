import { useState } from "react";
import axios from "axios";

function App() {
  const [registerNumber, setRegisterNumber] = useState("");
  const [dob, setDob] = useState("");
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState("");

  const verifyStudent = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/students/verify",
        {
          registerNumber,
          dob,
        }
      );

      setStudent(res.data.student);
      setMessage("");
    } catch (error) {
      setStudent(null);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const markAttendance = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/attendance/mark",
        {
          registerNumber: student.registerNumber,
        }
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to mark attendance");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "350px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2>Student Attendance</h2>

        <input
          type="text"
          placeholder="Register Number"
          value={registerNumber}
          onChange={(e) => setRegisterNumber(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <input
          type="text"
          placeholder="DD-MM-YYYY"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <button
          onClick={verifyStudent}
          style={{
            width: "100%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Verify Student
        </button>

        {message && (
          <p style={{ color: "red", marginTop: "15px" }}>{message}</p>
        )}

        {student && (
          <div style={{ marginTop: "20px" }}>
            <h3>Student Details</h3>

            <p>
              <strong>Name:</strong> {student.name}
            </p>

            <p>
              <strong>Department:</strong> {student.department}
            </p>

            <p>
              <strong>Year:</strong> {student.year}
            </p>

            <button
              onClick={markAttendance}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "15px",
                cursor: "pointer",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Mark Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;