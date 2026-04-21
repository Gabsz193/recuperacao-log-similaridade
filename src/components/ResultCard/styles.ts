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

export const ResultCardContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "$index" &&
    prop !== "$rank" &&
    prop !== "$noMatch" &&
    prop !== "$pct",
})<{ $index?: number; $rank?: number; $noMatch?: boolean; $pct?: number }>(
  ({ theme, $index, $rank, $noMatch, $pct }) => ({
    background: theme.palette.background.paper,
    border: `0.0625rem solid ${$noMatch ? theme.palette.background.surfaceDark : theme.palette.divider}`,
    borderLeft: `3px solid ${$noMatch ? theme.palette.background.surfaceDark : $rank === 0 ? theme.palette.warning.main : theme.palette.primary.main}`,
    borderRadius: "0.75rem",
    padding: "1rem",
    marginBottom: "1rem",
    overflow: "hidden",
    opacity: $noMatch ? 0.45 : 1,
    position: "relative",

    animation: `${fadeUp} 0.3s ease ${($index ?? 0) * 0.06}s both`,
  }),
);

export const ScoreBackground = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$pct" && prop !== "$rank",
})<{ $pct?: number; $rank?: number }>(({ theme, $pct, $rank }) => ({
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  width: `${$pct ?? 0}%`,
  background:
    $rank === 0
      ? `${theme.palette.warning.main}05`
      : `${theme.palette.primary.main}04`,
  pointerEvents: "none",
  transition: "width 0.6s ease",
}));

export const ResultRow = styled(Box)({
  display: "flex",
  gap: "0.75rem",
  alignItems: "center",
  position: "relative",
});

export const RankBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== "index",
})<{ index: number }>(({ theme, index }) => {
  const isTop = index === 1;

  return {
    minWidth: "1.875rem",
    height: "1.875rem",
    borderRadius: "0.4375rem",
    flexShrink: 0,
    background: isTop ? theme.palette.warning.main : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: 800,
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.background.surfaceDark}`,
    boxShadow: isTop ? `0 0 24px ${theme.palette.warning.main}66` : "none",
  };
});

export const FileInfo = styled(Box)({
  flex: 1,
});

export const FileNameRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
});

export const FileName = styled(Box)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.primary,
  fontWeight: 600,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: 320,
}));

export const Pill = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$color",
})<{ $color?: string }>(({ $color }) => ({
  background: `${$color}20`,
  color: $color,
  border: `1px solid ${$color}40`,
  borderRadius: 4,
  padding: "2px 8px",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.5px",
  whiteSpace: "nowrap",
  boxShadow: `0 0 8px ${$color}40`,
}));

export const FileMetaRow = styled(Box)({
  display: "flex",
  gap: 12,
  marginTop: 5,
  fontSize: 10,
  flexWrap: "wrap",
});

export const FileMeta = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const ExpandToggle = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const ScoreSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "center",
  minWidth: 100,
});

export const ScoreValue = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$noMatch" && prop !== "$rank",
})<{ $noMatch?: boolean; $rank?: number }>(({ theme, $noMatch, $rank }) => ({
  fontSize: 16,
  fontWeight: 700,
  color: $noMatch
    ? theme.palette.info.default
    : $rank === 0
      ? theme.palette.warning.main
      : theme.palette.primary.main,
  textShadow:
    !$noMatch && $rank === 0
      ? `0 0 12px ${theme.palette.warning.main}66`
      : !$noMatch
        ? `0 0 12px ${theme.palette.primary.main}66`
        : "none",
}));

export const ScoreBarContainer = styled(Box)(({ theme }) => ({
  marginTop: 5,
  width: 100,
  height: 4,
  background: theme.palette.background.surface,
  borderRadius: 4,
  overflow: "hidden",
  boxShadow: `0 0 12px ${theme.palette.primary.main}33`,
}));

export const ScoreBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$pct" && prop !== "$rank",
})<{ $pct?: number; $rank?: number }>(({ theme, $pct, $rank }) => ({
  height: "100%",
  width: `${$pct ?? 0}%`,
  background:
    $rank === 0
      ? `linear-gradient(90deg,${theme.palette.warning.main}88,${theme.palette.warning.main})`
      : `linear-gradient(90deg,${theme.palette.primary.main}88,${theme.palette.primary.main})`,
  borderRadius: 4,
  transition: "width 0.6s ease, box-shadow 0.6s ease",
  boxShadow:
    $rank === 0
      ? `0 0 12px ${theme.palette.warning.main}66`
      : `0 0 12px ${theme.palette.primary.main}66`,
}));

export const HighlightBox = styled(Box)(({ theme }) => ({
  marginTop: "0.625rem",
  padding: "0.625rem 0.75rem",
  background: theme.palette.background.default,
  borderTop: `1px solid ${theme.palette.background.surfaceDark}`,
  borderRadius: "0.5rem",

  animation: `${fadeUp} 0.25s ease`,
}));

export const HighlightDescription = styled(Box)(({ theme }) => ({
  fontSize: 11,
  color: theme.palette.text.secondary,
  marginBottom: 10,
}));

export const HighlightItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$color",
})<{ $color?: string }>(({ theme, $color }) => ({
  display: "flex",
  gap: "0.625rem",
  alignItems: "flex-start",
  marginBottom: "0.375rem",
  padding: "7px 10px",
  borderRadius: 7,
  background: theme.palette.background.surface,
  border: `1px solid ${theme.palette.background.surfaceDark}`,
  borderLeft: `2px solid ${$color ?? theme.palette.text.secondary}`,

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
