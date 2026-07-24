import { createTheme } from "@mui/material/styles";
import colors from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },

    secondary: {
      main: colors.secondary,
    },

    success: {
      main: colors.success,
    },

    error: {
      main: colors.danger,
    },

    warning: {
      main: colors.warning,
    },

    background: {
      default: colors.background,
      paper: colors.card,
    },
  },

  typography: {
    fontFamily: "Poppins, sans-serif",

    h3: {
      fontWeight: 700,
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 16,
  },
});

export default theme;