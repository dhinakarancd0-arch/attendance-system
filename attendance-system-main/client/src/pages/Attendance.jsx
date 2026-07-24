import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import DashboardLayout from "../components/DashboardLayout";

import {
  Box,
  Typography,
  Paper,
  TextField,
  Chip,
  Button,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import {
  Download,
  CalendarMonth,
} from "@mui/icons-material";

import "../styles/Attendance.css";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const today = new Date().toISOString().split("T")[0];
const navigate = useNavigate();

const logout = () => {
  localStorage.clear();
  navigate("/staff-login");
};
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    fetchAttendance(date);
  }, []);

  const fetchAttendance = async (selectedDate) => {
    try {
      const res = await api.get(
        `/attendance/date/${selectedDate}`
      );

      setAttendance(
        res.data.attendance.map((item) => ({
          id: item._id,
          registerNumber: item.student.registerNumber,
          name: item.student.name,
          department: item.student.department,
          year: item.student.year,
          time: item.time,
          status: item.status,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      field: "registerNumber",
      headerName: "Register No",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "year",
      headerName: "Year",
      width: 100,
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "Present"
              ? "success"
              : "error"
          }
          size="small"
        />
      ),
    },
  ];

  return (
    <DashboardLayout onLogout={logout}>
      <div className="attendance-page">

        <div className="attendance-header">

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Attendance History
          </Typography>

          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={() => {
              window.open(
             `https://attendance-system-bozk.onrender.com/api/attendance/export/${today}`,
              "_blank"
              );
            }}
          >
            Export Excel
          </Button>

        </div>

        <Box
          display="flex"
          alignItems="center"
          gap={2}
          mb={3}
        >
          <CalendarMonth color="primary" />

          <TextField
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              fetchAttendance(e.target.value);
            }}
          />
        </Box>

        <Paper className="attendance-table">

          <DataGrid
            rows={attendance}
            columns={columns}
            autoHeight
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
          />

        </Paper>

      </div>
    </DashboardLayout>
  );
}

export default Attendance;