import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

function PrimaryButton({
  children,
  onClick,
  color = "primary",
  fullWidth = false,
  startIcon,
  loading = false,
  type = "button",
}) {
  return (
    <Button
      variant="contained"
      color={color}
      type={type}
      fullWidth={fullWidth}
      startIcon={!loading ? startIcon : null}
      disabled={loading}
      onClick={onClick}
      sx={{
        minWidth: 180,
        height: 54,
        borderRadius: "14px",
        fontWeight: 700,
        fontSize: "16px",
        letterSpacing: ".3px",
        textTransform: "none",

        boxShadow: "0 12px 25px rgba(37,99,235,.25)",

        transition: "all .3s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 20px 35px rgba(37,99,235,.35)",
        },
      }}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        children
      )}
    </Button>
  );
}

export default PrimaryButton;