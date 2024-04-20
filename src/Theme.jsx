import "@fontsource/roboto";
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { grey, teal as primary, pink as secondary } from "@mui/material/colors";
import React, { useMemo } from "react";

export const primary10 = "#002720";
export const primary950 = "#003A30";

function useMaterialTheme() {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return useMemo(
    () =>
      responsiveFontSizes(
        createTheme(
          {
            palette: {
              mode: darkMode ? "dark" : "light",
              primary,
              secondary,
              background: {
                default: darkMode ? "black" : primary[100],
                paper: darkMode ? grey[900] : primary[50],
              },
            },
            shape: {
              borderRadius: 24,
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
              MuiButton: {
                styleOverrides: {
                  root: {
                    textTransform: "none",
                  },
                  textPrimary: {
                    color: darkMode ? primary[100] : primary[800],
                  },
                },
              },
              MuiCard: {
                defaultProps: {
                  elevation: 0,
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
              MuiLink: {
                styleOverrides: {
                  root: {
                    color: darkMode ? primary[100] : primary[800],
                  },
                },
              },
              MuiTab: {
                styleOverrides: {
                  textColorPrimary: {
                    "&.Mui-selected": {
                      color: darkMode ? primary[100] : primary[800],
                    },
                  },
                },
              },
            },
          },
        ),
      ),
    [darkMode],
  );
}

export default function ThemeProvider({ children }) {
  return (
    <MuiThemeProvider theme={useMaterialTheme()}>
      <CssBaseline />
      <GlobalStyling />
      {children}
    </MuiThemeProvider>
  );
}

function GlobalStyling() {
  const { palette } = useTheme();
  return (
    <GlobalStyles
      styles={{ body: { backgroundColor: palette.background.default } }}
    />
  );
}
