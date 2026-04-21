import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { keyframes } from "@mui/system";

export const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(0.375rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

export const ResultCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$index",
})<{ $index?: number }>(({ theme, $index }) => ({
  background: theme.palette.background.paper,
  border: `0.0625rem solid ${theme.palette.divider}`,
  borderRadius: "0.75rem",
  padding: "1rem",
  marginBottom: "1rem",

  animation: `${fadeUp} 0.3s ease ${($index ?? 0) * 0.06}s both`,
}));

export const ResultRow = styled(Box)({
  display: "flex",
  gap: "0.75rem",
  alignItems: "flex-start",
});

export const RankBadge = styled(Box)(({ theme }) => ({
  minWidth: "1.75rem",
  fontWeight: 700,
  color: theme.palette.text.secondary,
}));

export const FileInfo = styled(Box)({
  flex: 1,
});

export const FileName = styled(Box)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.primary,
}));

export const FileMeta = styled(Box)(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
}));

export const HighlightBox = styled(Box)(({ theme }) => ({
  marginTop: "0.625rem",
  padding: "0.625rem 0.75rem",
  background: theme.palette.background.default,
  borderRadius: "0.5rem",

  animation: `${fadeUp} 0.25s ease`,
}));

export const HighlightItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$color",
})<{ $color?: string }>(({ theme, $color }) => ({
  display: "flex",
  gap: "0.625rem",
  alignItems: "flex-start",
  marginBottom: "0.375rem",

  span: {
    fontSize: "0.6875rem",
    lineHeight: 1.6,
  },

  "& span:first-of-type": {
    color: $color ?? theme.palette.text.secondary,
    fontWeight: 700,
    minWidth: "6.25rem",
  },

  "& span:last-of-type": {
    color: theme.palette.info.main,
    wordBreak: "break-word",
    flex: 1,
  },
}));
