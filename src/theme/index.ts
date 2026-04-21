import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.primary,
    },

    success: {
      main: colors.success.main,
      light: colors.success.light,
    },

    error: {
      main: colors.error.main,
      light: colors.error.light,
    },

    warning: {
      main: colors.warning.main,
      light: colors.warning.light,
    },

    background: {
      default: colors.background.default,
      paper: colors.background.paper,
      surface: colors.background.surface,
      surfaceDark: colors.background.surfaceDark,
    },

    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },

    info: {
      main: colors.info.muted,
      default: colors.info.default,
    },

    gradient: {
      primaryStart: colors.gradient.primaryStart,
      primaryEnd: colors.gradient.primaryEnd,
      primaryHoverStart: colors.gradient.primaryHoverStart,
      primaryHoverEnd: colors.gradient.primaryHoverEnd,
    },

    divider: colors.border,

    log: colors.log,
  },
});
