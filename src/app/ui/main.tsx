import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "../app.tsx";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "../../modules/theme/theme-context.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
);
