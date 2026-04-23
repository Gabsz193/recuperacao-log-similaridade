import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import "./index.css";
import App from "./app/App.js";
import { theme } from "./theme";
import QueryProvider from "./providers/QueryProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
);
