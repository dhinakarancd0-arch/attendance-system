import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../services/api";
import "../styles/MemberLogin.css";

function MemberLogin() {
  const [registerNumber, setRegisterNumber] = useState("");
  const [dob, setDob] = useState("");
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState("");

  const [attendanceMessage, setAttendanceMessage] = useState("");
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceSuccess, setAttendanceSuccess] = useState(false);
 const today = new Date();
today.setHours(0, 0, 0, 0);

const presentCount = attendanceHistory.length;

const absentCount = attendanceHistory.filter((item) => {
  const d = new Date(item.date);
  d.setHours(0, 0, 0, 0);
  return d < today;
}).length;

const totalDays = presentCount + absentCount;

const attendancePercentage =
  totalDays === 0
    ? "0.0"
    : ((presentCount / totalDays) * 100).toFixed(1);

const verifyStudent = async () => {
    try {
      // Verify student
      const res = await api.post("/students/verify", {
        registerNumber,
        dob,
      });

      setStudent(res.data.student);

      // Get attendance history
      const attendanceRes = await api.get(
        `/attendance/student/${registerNumber}`
      );

      console.log("Attendance History:", attendanceRes.data.attendance);

      setAttendanceHistory(attendanceRes.data.attendance);

      setMessage("");
      setAttendanceMessage("");
    } catch (error) {
      setStudent(null);
      setAttendanceHistory([]);
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

    // Refresh attendance after marking
    const attendanceRes = await api.get(
      `/attendance/student/${student.registerNumber}`
    );

    setAttendanceHistory(attendanceRes.data.attendance);

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
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      verifyStudent();
    }
  }}
  className="member-input"
/>
        <input
  type="text"
  placeholder="DD-MM-YYYY"
  value={dob}
  onChange={(e) => setDob(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      verifyStudent();
    }
  }}
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
            <div
         style={{
            background: "#f5f7ff",
            padding: "15px",
           borderRadius: "10px",
           marginTop: "20px",
            marginBottom: "15px",
      }}
    >
               <h3>📊 Attendance Summary</h3>

               <p>✅ Present : <b>{presentCount}</b></p>

               <p>❌ Absent : <b>{absentCount}</b></p>

              <p>📈 Attendance : <b>{attendancePercentage}%</b></p>
           </div>

            <h3 style={{ marginTop: "20px" }}>
              📅 Attendance Calendar
            </h3>
            <div
             style={{
    display: "flex",
    gap: "20px",
    marginBottom: "10px",
    fontWeight: "600",
  }}
>
  <span style={{ color: "green" }}>🟢 Present</span>

  <span style={{ color: "red" }}>🔴 Absent</span>
</div>

            <Calendar
            tileDisabled={({ date }) => date > new Date()}
            onChange={setSelectedDate}
             value={selectedDate}
              tileClassName={({ date, view }) => {
                if (view !== "month") return "";

              const year = date.getFullYear();
             const month = String(date.getMonth() + 1).padStart(2, "0");
             const day = String(date.getDate()).padStart(2, "0");

             const formattedDate = `${year}-${month}-${day}`;

                const isPresent = attendanceHistory.some(
                  (item) => item.date === formattedDate
                );

                if (isPresent) {
                  return "present-day";
                }

                const today = new Date();
                today.setHours(0, 0, 0, 0);

               const currentDate = new Date(date);
                currentDate.setHours(0, 0, 0, 0);

               if (currentDate < today) {
               return "absent-day";
          }

                return "";
              }}
            />
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