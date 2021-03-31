import { withStyles } from '@material-ui/core';
import React from 'react';

function MiniLayout({ children, classes }) {
  return <div className={classes.wrapper}>{children}</div>;
}

const styles = ({ spacing }) => ({
  wrapper: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: `${spacing(4)}px 0`,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withStyles(styles)(MiniLayout);
