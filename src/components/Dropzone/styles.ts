import { styled, keyframes, alpha } from "@mui/material/styles";
import { Box } from "@mui/material";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const DropzoneContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "dragging" && prop !== "uploading",
})<{ dragging: boolean; uploading: boolean }>(
  ({ theme, dragging, uploading }) => ({
    border: `0.125rem dashed ${
      dragging ? theme.palette.primary.main : theme.palette.divider
    }`,
    borderRadius: "0.75rem",
    padding: "1.125rem 1.5rem",
    textAlign: "center",
    cursor: "pointer",
    background: dragging
      ? alpha(theme.palette.primary.main, 0.06)
      : theme.palette.background.surfaceDark,
    transition: "all .2s",
    opacity: uploading ? 0.6 : 1,
  }),
);

export const Icon = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$spin",
})<{ $spin?: boolean }>(({ $spin }) => ({
  fontSize: "1.375rem",
  marginBottom: "0.375rem",
  animation: $spin ? `${spin} 1s linear infinite` : "none",
}));

export const Text = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$active",
})<{ $active?: boolean }>(({ theme, $active }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
  transition: "all 0.2s ease",
  transform: $active ? "scale(1.02)" : "scale(1)",
}));

export const Hint = styled(Box)(({ theme }) => ({
  fontSize: "0.5rem",
  marginTop: "0.25rem",
  color: theme.palette.log.hint,
}));
