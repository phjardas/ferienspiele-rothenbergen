import { withStyles } from '@material-ui/core';
import React from 'react';

function FormInfo({ children, classes }) {
  return <p className={classes.root}>{children}</p>;
}

const styles = ({ typography }) => ({
  root: {
    ...typography.body1,
  },
});

export default withStyles(styles)(FormInfo);
