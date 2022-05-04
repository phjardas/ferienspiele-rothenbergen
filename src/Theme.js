import { createTheme, CssBaseline, makeStyles, MuiThemeProvider } from '@material-ui/core';
import { indigo, purple } from '@material-ui/core/colors';
import React from 'react';

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: purple,
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
