import { createMuiTheme, CssBaseline, makeStyles, MuiThemeProvider } from '@material-ui/core';
import React from 'react';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#013f8c',
    },
    secondary: {
      main: '#08d353',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

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
