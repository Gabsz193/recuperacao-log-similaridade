import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const SummaryText = styled(Box)(({ theme }) => ({
  fontSize: "0.8125rem",
  color: theme.palette.text.secondary,
  marginBottom: "1rem",
}));
