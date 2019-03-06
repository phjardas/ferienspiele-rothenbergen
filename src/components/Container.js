import { withStyles } from '@material-ui/core';
import React from 'react';

function Container({ children, classes }) {
  return <div className={classes.root}>{children}</div>;
}

const styles = ({ spacing }) => ({
  root: {
    marginLeft: spacing.unit * 2,
    marginRight: spacing.unit * 2,
  },
});

export default withStyles(styles)(Container);
