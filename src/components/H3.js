import { Typography, withStyles } from '@material-ui/core';
import React from 'react';

function H3({ className, classes, ...props }) {
  return <Typography component="h3" variant="h5" className={`${classes.root} ${className || ''}`} {...props} />;
}

const styles = ({ spacing }) => ({ root: { marginBottom: spacing(2) } });

export default withStyles(styles)(H3);
