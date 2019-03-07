import { Button, CircularProgress, withStyles } from '@material-ui/core';
import React from 'react';

function SpinningButton({ spinning, disabled, icon, children, classes, ...props }) {
  const Icon = icon;

  return (
    <Button disabled={disabled || spinning} {...props}>
      {spinning ? <CircularProgress size={24} className={classes.icon} /> : Icon && <Icon className={classes.icon} />}
      {children}
    </Button>
  );
}

const styles = ({ spacing }) => ({
  icon: {
    marginRight: spacing.unit,
  },
});

export default withStyles(styles)(SpinningButton);
