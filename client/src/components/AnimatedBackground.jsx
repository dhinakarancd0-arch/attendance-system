import { Box } from "@mui/material";
import { motion } from "framer-motion";

function AnimatedBackground() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #0F172A 0%, #1D4ED8 45%, #2563EB 100%)",
        zIndex: -1,
      }}
    >
      {/* Top Left Circle */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.10)",
          filter: "blur(70px)",
          top: -120,
          left: -120,
        }}
      />

      {/* Bottom Right Circle */}
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "rgba(124,58,237,.25)",
          filter: "blur(70px)",
          bottom: -120,
          right: -120,
        }}
      />

      {/* Center Glow */}
      <motion.div
        animate={{
          opacity: [0.15, 0.35, 0.15],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "#ffffff",
          filter: "blur(120px)",
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </Box>
  );
}

export default AnimatedBackground;