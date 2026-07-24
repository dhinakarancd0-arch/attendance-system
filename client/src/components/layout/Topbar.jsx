import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";

function Topbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        ml: "240px",
        width: "calc(100% - 240px)",
        backgroundColor: "#2563EB",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Incubation Cell Attendance Management System
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Typography>Staff</Typography>

          <Avatar sx={{ bgcolor: "#16A34A" }}>
            S
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;