import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.jsx";

// Windows 11 Inspired Theme - Techy Dark Blue/Purple
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0078D4", // Windows 11 Blue
      light: "#4A9EE0",
      dark: "#005A9E",
    },
    secondary: {
      main: "#8B5CF6", // Purple accent
      light: "#A78BFA",
      dark: "#7C3AED",
    },
    background: {
      default: "#1A1A2E", // Dark navy
      paper: "#16213E", // Slightly lighter navy
    },
    text: {
      primary: "#E4E4E7",
      secondary: "#A1A1AA",
    },
    error: {
      main: "#EF4444",
    },
    success: {
      main: "#10B981",
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 24px",
        },
        contained: {
          boxShadow: "0 4px 14px 0 rgba(0, 118, 255, 0.39)",
          "&:hover": {
            boxShadow: "0 6px 20px rgba(0, 118, 255, 0.5)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(22, 33, 62, 0.8)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);