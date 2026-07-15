import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";

function DashboardLayout({ children, onLogout }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fb" }}>
      <Sidebar onLogout={onLogout} />

      <Box
        component="main"
        sx={{
          flex: 1,
          p: 4,
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;