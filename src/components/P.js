import { Typography, withStyles } from '@material-ui/core';
import React from 'react';

function P({ className, classes, ...props }) {
  return <Typography tag="p" variant="body1" className={`${classes.root} ${className || ''}`} {...props} />;
}

const styles = ({ spacing }) => ({ root: { marginBottom: spacing.unit * 2 } });

export default withStyles(styles)(P);
