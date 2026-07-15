import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import Logo from "./Logo";

function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "transparent",
        boxShadow: "none",
        py: 2,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Logo size={55} showText={false} />

          <Typography
            variant="h6"
            sx={{
              color: "#0F172A",
              fontWeight: 700,
            }}
          >
            Sankara Educational Institutions
          </Typography>
        </Box>

        <Typography
          sx={{
            color: "#0F172A",
            fontWeight: 500,
          }}
        >
          Incubation Cell Attendance Portal
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;