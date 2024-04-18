import "@fontsource/roboto";
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes,
} from "@mui/material";
import {
  purple as primary,
  deepOrange as secondary,
} from "@mui/material/colors";
import React from "react";

const theme = responsiveFontSizes(
  createTheme(
    {
      palette: {
        primary,
        secondary,
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
          },
        },
        MuiCard: {
          defaultProps: {
            elevation: 0,
          },
          styleOverrides: {
            root: {
              backgroundColor: primary[50],
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
      },
    },
  ),
);

export default function ThemeProvider({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyling />
      {children}
    </MuiThemeProvider>
  );
}

function GlobalStyling() {
  return <GlobalStyles styles={{ body: { backgroundColor: primary[100] } }} />;
}
