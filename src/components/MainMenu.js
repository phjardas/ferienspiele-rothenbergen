import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

export default function MainMenu() {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Ferienspiele Rothenbergen
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
