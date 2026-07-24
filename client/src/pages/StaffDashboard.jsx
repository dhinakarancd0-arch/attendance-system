import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Button,
  Paper,
} from "@mui/material";

import {
  Groups,
  CheckCircle,
  Cancel,
  Schedule,
  PersonAdd,
  EventAvailable,
  Download,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import api from "../services/api";

import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";

function StaffDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalMembers: 0,
    presentToday: 0,
    absentToday: 0,
  });

  const [time, setTime] = useState(new Date());

  const staffName =
    localStorage.getItem("staffName") || "Staff";

  useEffect(() => {
    fetchStats();

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const memberRes = await api.get("/members/stats");
      const attendanceRes = await api.get("/attendance/today");

      const total = memberRes.data.totalMembers;
      const present = attendanceRes.data.count;

      setStats({
        totalMembers: total,
        presentToday: present,
        absentToday: total - present,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/staff-login");
  };

  return (
    <DashboardLayout onLogout={logout}>
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#64748B",
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            Incubation Cell Dashboard
          </Typography>

          <Typography
            variant="h3"
            fontWeight="bold"
            mt={1}
          >
            Welcome, {staffName} 👋
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
          >
            {time.toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            bgcolor: "#EEF4FF",
            px: 3,
            py: 2,
            borderRadius: 4,
          }}
        >
          <Typography
            fontWeight="bold"
            color="#2563EB"
            fontSize={22}
          >
            {time.toLocaleTimeString()}
          </Typography>
        </Paper>
      </Box>

      {/* Dashboard Cards */}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Members"
            value={stats.totalMembers}
            icon={<Groups />}
            color="#2563EB"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Present Today"
            value={stats.presentToday}
            icon={<CheckCircle />}
            color="#22C55E"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Absent Today"
            value={stats.absentToday}
            icon={<Cancel />}
            color="#EF4444"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Current Time"
            value={time.toLocaleTimeString()}
            icon={<Schedule />}
            color="#7C3AED"
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}

      <Paper
        elevation={2}
        sx={{
          mt: 5,
          p: 3,
          borderRadius: 4,
          display: "inline-block",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={3}
        >
          Quick Actions
        </Typography>

        <Box
          display="flex"
          gap={2}
          flexWrap="wrap"
        >
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={() => navigate("/members")}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.3,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: 3,
            }}
          >
            Members
          </Button>

          <Button
            variant="contained"
            color="success"
            startIcon={<EventAvailable />}
            onClick={() => navigate("/attendance")}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.3,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: 3,
            }}
          >
            Attendance
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<Download />}
            onClick={() => {
              const today =
                new Date().toISOString().split("T")[0];

              window.open(
              `https://attendance-system-bozk.onrender.com/api/attendance/export/${today}`,
                "_blank"
              );
            }}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.3,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: 3,
            }}
          >
            Export Excel
          </Button>
        </Box>
      </Paper>
    </DashboardLayout>
  );
}

export default StaffDashboard;