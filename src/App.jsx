import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./api/auth";
import Pages from "./pages/index";
import ThemeColorProvider from "./theme/ThemeColorProvider";
import ThemeColorRotator from "./theme/ThemeColorRotator";
import ThemeProvider from "./theme/ThemeProvider";

export default function App() {
  return (
    <ThemeColorProvider>
      <ThemeProvider>
        <HelmetProvider>
          <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Pages />
            </LocalizationProvider>
          </AuthProvider>
        </HelmetProvider>
      </ThemeProvider>
      <ThemeColorRotator />
    </ThemeColorProvider>
  );
}
