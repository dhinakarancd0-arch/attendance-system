import { Paper, Typography, Box } from "@mui/material";

function FeatureCard({ icon, title, description, color }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "20px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 2,
        border: "1px solid #E5E7EB",
        transition: ".3s",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 15px 30px rgba(0,0,0,.12)",
        },
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: "18px",
          background: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: 28,
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography fontWeight={700} fontSize={18}>
          {title}
        </Typography>

        <Typography color="text.secondary" fontSize={14}>
          {description}
        </Typography>
      </Box>
    </Paper>
  );
}

export default FeatureCard;