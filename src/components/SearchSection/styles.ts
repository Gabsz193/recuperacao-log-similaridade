import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const SearchSectionContainer = styled(Box)({
  display: "flex",
  gap: "0.625rem",
  alignItems: "center",

  "& > :first-child": {
    flex: 1,
  },
});
