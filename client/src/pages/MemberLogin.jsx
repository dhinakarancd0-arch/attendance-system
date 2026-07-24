import { useState } from "react";
import api from "../services/api";
import "../styles/MemberLogin.css";

function MemberLogin() {
  const [registerNumber, setRegisterNumber] = useState("");
  const [dob, setDob] = useState("");
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState("");

  const [attendanceMessage, setAttendanceMessage] = useState("");
  const [attendanceSuccess, setAttendanceSuccess] = useState(false);

  const verifyStudent = async () => {
    try {
      const res = await api.post("/students/verify", {
        registerNumber,
        dob,
      });

      setStudent(res.data.student);
      setMessage("");
      setAttendanceMessage("");
    } catch (error) {
      setStudent(null);
      setAttendanceMessage("");
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const markAttendance = async () => {
    try {
      const res = await api.post("/attendance/mark", {
        registerNumber: student.registerNumber,
      });

      setAttendanceMessage(res.data.message);
      setAttendanceSuccess(true);
    } catch (error) {
      setAttendanceMessage(
        error.response?.data?.message || "Failed to mark attendance"
      );
      setAttendanceSuccess(false);
    }
  };

  return (
    <div className="member-page">
      <div className="member-card">
        <img
          src="/sankara-logo.png"
          alt="Sankara"
          className="member-logo"
        />

        <h1>Sankara Educational Institutions</h1>

        <p className="sub-title">
          Incubation Cell Attendance Portal
        </p>

        <h2>👤 Member Login</h2>

        <p className="login-desc">
          Verify your identity to mark attendance
        </p>

        <input
          type="text"
          placeholder="Register Number"
          value={registerNumber}
          onChange={(e) => setRegisterNumber(e.target.value)}
          className="member-input"
        />

        <input
          type="text"
          placeholder="DD-MM-YYYY"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="member-input"
        />

        <button
          onClick={verifyStudent}
          className="verify-btn"
        >
          Verify Identity
        </button>

        {message && (
          <p className="error-msg">
            {message}
          </p>
        )}

        {student && (
          <div className="student-card">
            <h3>Verified Student</h3>

            <div className="student-row">
              <span>Name</span>
              <b>{student.name}</b>
            </div>

            <div className="student-row">
              <span>Register No</span>
              <b>{student.registerNumber}</b>
            </div>

            <div className="student-row">
              <span>Department</span>
              <b>{student.department}</b>
            </div>

            <div className="student-row">
              <span>Year</span>
              <b>{student.year}</b>
            </div>

            <button
              onClick={markAttendance}
              className="attendance-btn"
            >
              ✅ Mark Attendance
            </button>

            {attendanceMessage && (
              <p
                className={
                  attendanceSuccess
                    ? "success-msg"
                    : "error-msg"
                }
              >
                {attendanceMessage}
              </p>
            )}
          </div>
        )}

        <div className="instructions">
          <h3>Instructions</h3>

          <ul>
            <li>Enter your Register Number.</li>
            <li>Date of Birth must match records.</li>
            <li>Attendance can only be marked once per day.</li>
            <li>Contact Admin if verification fails.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MemberLogin;