import { Box, Typography, Stack } from "@mui/material";
import { School, AdminPanelSettings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: "center",
        color: "#0F172A",
        mt: 8,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          mb: 2,
        }}
      >
        Incubation Cell
      </Typography>

      <Typography
        variant="h5"
        sx={{
          color: "#334155",
          mb: 2,
        }}
      >
        Attendance Management Portal
      </Typography>

      <Typography
        sx={{
          maxWidth: 700,
          mx: "auto",
          color: "#334155" ,
          mb: 5,
          fontSize: 18,
        }}
      >
        Smart, Secure and Digital Attendance System for Sankara Educational Institutions.
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        justifyContent="center"
      >
        <PrimaryButton
          startIcon={<School />}
          onClick={() => navigate("/member-login")}
        >
          Student Login
        </PrimaryButton>

        <PrimaryButton
          color="secondary"
          startIcon={<AdminPanelSettings />}
          onClick={() => navigate("/staff-login")}
        >
          Staff Login
        </PrimaryButton>
      </Stack>
    </Box>
  );
}

export default HeroSection;