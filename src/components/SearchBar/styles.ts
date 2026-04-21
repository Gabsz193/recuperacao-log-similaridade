import { styled } from "@mui/material/styles";
import { Box, TextField } from "@mui/material";

export const SearchBarContainer = styled(Box)({
  display: "flex",
  gap: "0.625rem",
});

export const InputWrapper = styled(Box)({
  flex: 1,
  position: "relative",
});

export const Icon = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "0.875rem",
  top: "50%",
  transform: "translateY(-50%)",
  color: theme.palette.primary.main,
  fontSize: "1rem",
  pointerEvents: "none",
  zIndex: 1,
}));

export const Input = styled(TextField)(({ theme }) => ({
  width: "100%",

  "& .MuiOutlinedInput-root": {
    background: theme.palette.background.surface,
    borderRadius: "0.625rem",
    color: theme.palette.text.primary,
    paddingLeft: "2.75rem",
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: "none",
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    borderColor: theme.palette.primary.main,
  },
}));
