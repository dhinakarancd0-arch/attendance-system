import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import logo from "../assets/sankara-logo.png";

function Logo({ size = 130, showText = true }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <motion.img
        src={logo}
        alt="Sankara Educational Institutions"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.8,
        }}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          marginBottom: 20,
        }}
      />

      {showText && (
        <>
          <Typography
                 variant="h4"
                 sx={{
                 fontWeight: 700,
                color: "#0F172A",
                 textAlign: "center",
                letterSpacing: ".5px",
  }}
>
  Sankara Educational Institutions
</Typography>
          <Typography
            sx={{
              mt: 1,
              fontSize: 20,
              fontWeight: 500,
              color: "#334155",
              textAlign: "center",
            }}
          >
            Incubation Cell Attendance Portal
          </Typography>

          <Typography
            sx={{
              mt: 1.5,
              color: "#64748B",
              textAlign: "center",
              fontSize: 15,
            }}
          >
            Smart • Secure • Digital Attendance System
          </Typography>
        </>
      )}
    </Box>
  );
}

export default Logo;