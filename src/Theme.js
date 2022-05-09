import { createTheme, CssBaseline, makeStyles, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core';
import { indigo, orange } from '@material-ui/core/colors';
import React from 'react';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: indigo,
      secondary: orange,
    },
    typography: {
      useNextVariants: true,
    },
  })
);

if (process.env.NODE_ENV === 'development') {
  console.info('Theme:', theme);
}

export default function ThemeProvider({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </MuiThemeProvider>
  );
}

const useStyles = makeStyles(({ palette }) => ({
  '@global': {
    strong: {
      fontWeight: 500,
    },
    a: {
      color: palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}));

function GlobalStyles() {
  useStyles();
  return null;
}
