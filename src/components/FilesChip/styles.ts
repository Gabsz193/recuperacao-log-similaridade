import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const FilesContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
});

export const Chip = styled(Box)(({ theme }) => ({
  background: theme.palette.action.hover,
  border: `0.0625rem solid ${theme.palette.divider}`,
  borderRadius: "0.5rem",
  padding: "0.375rem 0.75rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.6875rem",
}));

export const FileName = styled(Box)({
  maxWidth: "11.25rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const RemoveButton = styled(Box)({
  cursor: "pointer",
  fontSize: "0.875rem",
});
