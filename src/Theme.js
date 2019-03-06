import { createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import React from 'react';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

if (process.env.NODE_ENV === 'development') {
  console.info('Theme:', theme);
}

export default function ThemeProvider({ children }) {
  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </>
  );
}
