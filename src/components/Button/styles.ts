import { styled } from "@mui/material/styles";
import { Button as MuiButton } from "@mui/material";

export const ButtonRoot = styled(MuiButton)(({ theme }) => ({
  borderRadius: "0.625rem",
  padding: "0 1.5rem",
  fontSize: "0.8125rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
  minHeight: "2.75rem",
  backgroundImage: `linear-gradient(135deg, ${theme.palette.gradient.primaryStart}, ${theme.palette.gradient.primaryEnd})`,
  boxShadow: `0 0 18px ${theme.palette.gradient.primaryEnd}33`,
  color: theme.palette.common.white,
  transition: "background-image 0.2s ease, box-shadow 0.2s ease",

  "&:hover": {
    backgroundImage: `linear-gradient(135deg, ${theme.palette.gradient.primaryHoverStart}, ${theme.palette.gradient.primaryHoverEnd})`,
    boxShadow: `0 0 22px ${theme.palette.gradient.primaryHoverEnd}33`,
  },

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    color: theme.palette.text.disabled,
    boxShadow: "none",
  },
}));
