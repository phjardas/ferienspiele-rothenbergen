import { Typography, withStyles } from '@material-ui/core';
import React from 'react';

function H2({ className, classes, ...props }) {
  return <Typography component="h2" variant="h3" className={`${classes.root} ${className || ''}`} {...props} />;
}

const styles = ({ spacing }) => ({ root: { marginBottom: spacing.unit * 2 } });

export default withStyles(styles)(H2);
