import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./api/auth";
import Pages from "./pages/index";
import ThemeColorProvider from "./theme/ThemeColorProvider";
import ThemeProvider from "./theme/ThemeProvider";

export default function App() {
  return (
    <ThemeColorProvider>
      <ThemeProvider>
        <HelmetProvider>
          <AuthProvider>
            <Pages />
          </AuthProvider>
        </HelmetProvider>
      </ThemeProvider>
    </ThemeColorProvider>
  );
}
