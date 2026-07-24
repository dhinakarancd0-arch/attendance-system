import { Paper } from "@mui/material";

function GlassCard({ children }) {
  return (
    <Paper
      elevation={8}
      sx={{
        width: "100%",
        maxWidth: "900px",
        margin: "auto",
        padding: {
          xs: 4,
          sm: 5,
          md: 6,
        },

        background: "#FFFFFF",
        borderRadius: "28px",

        boxShadow: `
          0 20px 60px rgba(15,23,42,0.18),
          0 8px 20px rgba(15,23,42,0.08)
        `,

        border: "1px solid #E2E8F0",
      }}
    >
      {children}
    </Paper>
  );
}

export default GlassCard;