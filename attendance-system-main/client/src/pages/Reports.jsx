import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import DashboardLayout from "../components/DashboardLayout";

import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import {
  People,
  CheckCircle,
  Cancel,
  TrendingUp,
} from "@mui/icons-material";

import { PieChart } from "@mui/x-charts/PieChart";

import "../styles/Reports.css";

function Reports() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    presentToday: 0,
    absentToday: 0,
    attendancePercentage: 0,
    departmentStats: [],

    
  });
  const navigate = useNavigate();

const logout = () => {
  alert("Logout clicked");
  localStorage.clear();
  navigate("/staff-login");
};

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/attendance/report-stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const pieData = stats.departmentStats.map((item, index) => ({
    id: index,
    value: item.count,
    label: item.department,
  }));

  const cards = [
    {
      title: "Total Members",
      value: stats.totalMembers,
      icon: <People sx={{ fontSize: 40, color: "#2563eb" }} />,
    },
    {
      title: "Present Today",
      value: stats.presentToday,
      icon: <CheckCircle sx={{ fontSize: 40, color: "#22c55e" }} />,
    },
    {
      title: "Absent Today",
      value: stats.absentToday,
      icon: <Cancel sx={{ fontSize: 40, color: "#ef4444" }} />,
    },
    {
      title: "Attendance %",
      value: `${stats.attendancePercentage}%`,
      icon: <TrendingUp sx={{ fontSize: 40, color: "#7c3aed" }} />,
    },
  ];

  return (
    <DashboardLayout onLogout={logout}>

      <div className="reports-page">

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
        >
          Reports Dashboard
        </Typography>

        <Grid container spacing={3}>

          {cards.map((card) => (

            <Grid item xs={12} md={3} key={card.title}>

              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                }}
              >

                {card.icon}

                <Typography
                  mt={2}
                  color="text.secondary"
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                >
                  {card.value}
                </Typography>

              </Paper>

            </Grid>

          ))}

        </Grid>

        <Paper
          elevation={3}
          className="chart-card"
          sx={{
            mt: 5,
          }}
        >

          <Typography
            variant="h5"
            mb={3}
            fontWeight="bold"
          >
            Department Distribution
          </Typography>

          <PieChart
            series={[
              {
                data: pieData,
              },
            ]}
            width={500}
            height={300}
          />

        </Paper>

      </div>

    </DashboardLayout>
  );
}

export default Reports;