import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  School,
  AdminPanelSettings,
  
} from "@mui/icons-material";

import AnimatedBackground from "../components/AnimatedBackground";
import Logo from "../components/Logo";
import PrimaryButton from "../components/PrimaryButton";


import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <AnimatedBackground />

      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            py: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ width: "100%" }}
          >
            <Paper
              elevation={8}
              sx={{
                borderRadius: "30px",
                p: { xs: 4, md: 6 },
                background: "#ffffff",
              }}
            >
              <Logo size={130} />

             
              <Typography
                align="center"
                sx={{
                  mt: 2,
                  fontSize: 22,
                  color: "#475569",
                }}
              >
                Attendance Management System
              </Typography>

              <Typography
                align="center"
                sx={{
                  maxWidth: 700,
                  mx: "auto",
                  mt: 3,
                  color: "#64748B",
                  lineHeight: 1.8,
                }}
              >
                Manage members, mark attendance, generate reports,
                and monitor your Incubation Cell through one
                professional portal.
              </Typography>

              <Box
                sx={{
                  mt: 5,
                  display: "flex",
                  justifyContent: "center",
                  gap: 3,
                  flexWrap: "wrap",
                }}
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
              </Box>

              

              <Typography
                align="center"
                sx={{
                  mt: 5,
                  color: "#94A3B8",
                }}
              >
                © 2026 Sankara Educational Institutions
              </Typography>
            </Paper>
          </motion.div>
        </Box>
      </Container>
    </>
  );
}

export default Home;