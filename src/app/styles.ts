import { styled, alpha } from "@mui/material/styles";
import { Box } from "@mui/material";

export const AppContainer = styled(Box)(({ theme }) => ({
  fontFamily: "'JetBrains Mono','Fira Mono','Consolas',monospace",
  boxSizing: "border-box",

  overflowY: "auto",
  overflowX: "hidden",

  background: theme.palette.background.default,
  color: theme.palette.text.primary,

  minHeight: "100vh",

  "input::placeholder": {
    color: theme.palette.info.default,
  },

  scrollbarWidth: "thin",
  scrollbarColor: `${theme.palette.divider} transparent`,

  "&::-webkit-scrollbar": {
    width: "0.5rem",
  },

  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },

  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.divider,
    borderRadius: "0.5rem",
  },
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderBottom: `0.0625rem solid ${theme.palette.divider}`,
  padding: "1.5rem",
  paddingBottom: "1.25rem",
}));

export const HeaderRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  marginBottom: "1.25rem",
});

export const Logo = styled(Box)(({ theme }) => ({
  width: "2.375rem",
  height: "2.375rem",
  borderRadius: "0.5625rem",
  background: `linear-gradient(135deg, ${theme.palette.gradient.primaryStart}, ${theme.palette.gradient.primaryEnd})`,
  boxShadow: `0 0 24px ${theme.palette.gradient.primaryEnd}66`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.25rem",
}));

export const TitleGroup = styled(Box)({
  flex: 1,
});

export const Title = styled(Box)({
  fontSize: "1.125rem",
  fontWeight: 700,
});

export const Subtitle = styled(Box)(({ theme }) => ({
  fontSize: "0.6875rem",
  color: theme.palette.text.secondary,
}));

export const StatusBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.6875rem",
  background: theme.palette.background.surfaceDark,
  border: `0.0625rem solid ${theme.palette.divider}`,
  padding: "0.375rem 0.75rem",
  borderRadius: "0.5rem",
}));

export const StatusDot = styled(Box)<{ color: string }>(({ color }) => ({
  width: "0.5rem",
  height: "0.5rem",
  borderRadius: "50%",
  background: color,
  boxShadow: `0 0 0.375rem ${color}`,
}));

export const UploadMessageBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "type",
})<{ type: "ok" | "err" }>(({ theme, type }) => ({
  backgroundColor:
    type === "ok"
      ? alpha(theme.palette.success.main, 0.08)
      : alpha(theme.palette.error.main, 0.08),

  border: `0.0625rem solid ${
    type === "ok"
      ? alpha(theme.palette.success.main, 0.25)
      : alpha(theme.palette.error.main, 0.25)
  }`,

  borderRadius: "0.5rem",
  padding: "0.5rem 0.875rem",
  marginBottom: "0.875rem",

  color: type === "ok" ? theme.palette.success.main : theme.palette.error.main,
}));

export const DropAreaSpacer = styled(Box)({
  marginTop: "1rem",
});

export const UploadHint = styled(Box)(({ theme }) => ({
  fontSize: "0.6875rem",
  color: theme.palette.info.default,
  marginTop: "0.5rem",
  textAlign: "center",
}));

export const PageContent = styled(Box)({
  padding: "1.5rem 2rem",
});

export const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
}));
