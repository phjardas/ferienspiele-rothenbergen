import React from "react";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "./Theme";
import { AuthProvider } from "./api/auth";
import Pages from "./pages/index";

export default function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <AuthProvider>
          <Pages />
        </AuthProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}
