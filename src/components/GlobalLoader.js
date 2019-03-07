import React from 'react';
import { CircularProgress, withStyles } from '@material-ui/core';

function GlobalLoader({ classes }) {
  return (
    <div className={classes.root}>
      <CircularProgress size={80} color="secondary" />
    </div>
  );
}

const styles = {
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default withStyles(styles)(GlobalLoader);
