import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Login,
} from "@mui/icons-material";

import Logo from "../components/Logo";
import AnimatedBackground from "../components/AnimatedBackground";

import "../styles/Login.css";

function StaffLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("staffName", res.data.staff.name);
      localStorage.setItem("staffUsername", res.data.staff.username);

      navigate("/staff-dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }

    setLoading(false);
  };

  return (
    <>
      <AnimatedBackground />

      <Box className="login-page">
        <Paper className="login-card" elevation={10}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Logo size={90} showText={false} />

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mt: 2,
                color: "#0F172A",
              }}
            >
              Staff Login
            </Typography>

            <Typography
              sx={{
                color: "#64748B",
                mt: 1,
              }}
            >
              Sankara Educational Institutions
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
            sx={{ mt: 2 }}
          />

          <LoadingButton
            fullWidth
            variant="contained"
            size="large"
            loading={loading}
            startIcon={<Login />}
            sx={{
              mt: 4,
              height: 54,
              borderRadius: "14px",
              fontWeight: 700,
              fontSize: "16px",
            }}
            onClick={handleLogin}
          >
            Login
          </LoadingButton>
        </Paper>
      </Box>
    </>
  );
}

export default StaffLogin;