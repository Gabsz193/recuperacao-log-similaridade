import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { keyframes } from "@mui/system";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const ResultsWrapper = styled(Box)({
  padding: "1.5rem 2rem",
});

export const CenterState = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: "0.5rem",
});

export const LoadingText = styled(Box)(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
}));

export const EmptyIcon = styled(Box)({
  fontSize: "2.25rem",
});

export const EmptyText = styled(Box)(({ theme }) => ({
  fontSize: "0.8125rem",
  color: theme.palette.text.secondary,
}));

export const Spinner = styled(Box)(({ theme }) => ({
  display: "inline-block",
  width: "2.25rem",
  height: "2.25rem",
  border: `0.1875rem solid ${theme.palette.background.surface}`,
  borderTopColor: theme.palette.primary.main,
  borderRadius: "50%",
  animation: `${spin} 0.8s linear infinite`,
}));
