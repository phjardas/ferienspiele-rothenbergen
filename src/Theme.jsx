import "@fontsource/roboto";
import { CssBaseline, responsiveFontSizes, useMediaQuery } from "@mui/material";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  useColorScheme,
} from "@mui/material/styles";
import React, { useEffect, useMemo } from "react";

export const primary950 = "#003A30";

const light = {
  primary: "#8a5100",
  "on-primary": "#ffffff",
  "primary-container": "#ffdcbe",
  "on-primary-container": "#2c1600",
  secondary: "#725a42",
  "on-secondary": "#ffffff",
  "secondary-container": "#ffdcbe",
  "on-secondary-container": "#291806",
  tertiary: "#58633a",
  "on-tertiary": "#ffffff",
  "tertiary-container": "#dce8b4",
  "on-tertiary-container": "#161f01",
  error: "#ba1a1a",
  "on-error": "#ffffff",
  "error-container": "#ffdad6",
  "on-error-container": "#410002",
  background: "#ffeee0",
  "on-background": "#201b16",
  surface: "#fff8f5",
  "on-surface": "#201b16",
  "surface-variant": "#f2dfd1",
  "on-surface-variant": "#51453a",
  outline: "#837468",
  "outline-variant": "#d5c3b5",
  shadow: "#000000",
  scrim: "#000000",
  "inverse-surface": "#352f2b",
  "inverse-on-surface": "#faefe7",
  "inverse-primary": "#ffb86f",
};

const dark = {
  primary: "#ffb86d",
  "on-primary": "#492900",
  "primary-container": "#683c00",
  "on-primary-container": "#ffdcbd",
  secondary: "#e1c1a3",
  "on-secondary": "#402c18",
  "secondary-container": "#59422c",
  "on-secondary-container": "#feddbe",
  tertiary: "#bfcc9b",
  "on-tertiary": "#2a3411",
  "tertiary-container": "#404b25",
  "on-tertiary-container": "#dbe8b5",
  error: "#ffb4ab",
  "on-error": "#690005",
  "error-container": "#93000a",
  "on-error-container": "#ffb4ab",
  background: "#000000",
  "on-background": "#ebe1d9",
  surface: "#201b16",
  "on-surface": "#ebe1d9",
  "surface-variant": "#50453a",
  "on-surface-variant": "#d5c3b5",
  outline: "#9d8e81",
  "outline-variant": "#50453a",
  shadow: "#000000",
  scrim: "#000000",
  "inverse-surface": "#ebe1d9",
  "inverse-on-surface": "#352f2b",
  "inverse-primary": "#895100",
};

function createColorScheme(palette) {
  return {
    palette: {
      md: palette,
      primary: { main: palette.primary },
      secondary: { main: palette.secondary },
      success: { main: palette.tertiary },
      error: { main: palette.error },
      background: {
        default: palette.background,
        paper: palette.surface,
      },
      text: {
        primary: palette["on-surface"],
        secondary: palette["on-surface-variant"],
      },
    },
  };
}

function useMaterialTheme() {
  return useMemo(
    () =>
      responsiveFontSizes(
        extendTheme(
          {
            colorSchemes: {
              light: createColorScheme(light),
              dark: createColorScheme(dark),
            },
            shape: {
              borderRadius: 20,
            },
            typography: {
              useNextVariants: true,
            },
          },
          {
            components: {
              MuiAlert: {
                defaultProps: {
                  variant: "filled",
                },
                styleOverrides: {
                  root: {
                    ".MuiLink-root": {
                      color: "inherit",
                      textDecorationColor: "currentColor",
                      fontWeight: 700,
                    },
                  },
                },
              },
              MuiAppBar: {
                styleOverrides: {
                  colorPrimary: {
                    "--AppBar-background":
                      "var(--mui-palette-md-surface-variant)",
                    "--AppBar-color":
                      "var(--mui-palette-md-on-surface-variant)",
                  },
                },
              },
              MuiButton: {
                defaultProps: {
                  disableElevation: true,
                },
                styleOverrides: {
                  root: {
                    textTransform: "none",
                    padding: "0 24px",
                    minHeight: 40,
                  },
                  containedPrimary: {
                    backgroundColor: "var(--mui-palette-md-primary)",
                    color: "var(--mui-palette-md-on-primary)",
                  },
                  containedSecondary: {
                    backgroundColor: "var(--mui-palette-md-secondary)",
                    color: "var(--mui-palette-md-on-secondary)",
                  },
                },
              },
              MuiCard: {
                defaultProps: {
                  elevation: 0,
                },
                styleOverrides: {
                  root: {
                    color: "var(--mui-palette-md-on-primary-container)",
                  },
                },
              },
              MuiCardActions: {
                styleOverrides: {
                  root: {
                    paddingRight: 16,
                    paddingBottom: 16,
                    justifyContent: "flex-end",
                  },
                },
              },
              MuiCardContent: {
                styleOverrides: {
                  root: {
                    padding: 24,
                  },
                },
              },
              MuiCardHeader: {
                styleOverrides: {
                  root: {
                    padding: "24px 24px 16px",
                  },
                },
              },
              MuiDialog: {
                styleOverrides: {
                  paper: {
                    backgroundColor: "var(--mui-palette-md-surface)",
                  },
                },
              },
              MuiPopover: {
                styleOverrides: {
                  root: {
                    ".MuiPaper-root": {
                      backgroundColor: "var(--mui-palette-md-surface)",
                    },
                  },
                },
              },
              MuiFilledInput: {
                styleOverrides: {
                  root: {
                    borderRadius: 0,
                  },
                },
              },
              MuiTextField: {
                defaultProps: {
                  variant: "filled",
                },
              },
            },
          },
        ),
      ),
    [],
  );
}

export default function ThemeProvider({ children }) {
  return (
    <CssVarsProvider theme={useMaterialTheme()}>
      <CssBaseline />
      <ModeSwitcher />
      {children}
    </CssVarsProvider>
  );
}

function ModeSwitcher() {
  const { setMode } = useColorScheme();
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  useEffect(() => setMode(darkMode ? "dark" : "light"), [darkMode, setMode]);
}
