import { Button, CircularProgress, withStyles } from '@material-ui/core';
import React from 'react';

function SpinningButton({ spinning, disabled, icon, children, color, variant, classes, className, ...props }) {
  const Icon = icon;

  let colorClass = '';
  if (color === 'error') {
    colorClass = classes[`${color}-${variant || 'text'}`];
    color = undefined;
  }

  return (
    <Button disabled={disabled || spinning} color={color} variant={variant} className={`${className || ''} ${colorClass}`} {...props}>
      {spinning ? <CircularProgress size={24} className={classes.icon} /> : Icon && <Icon className={classes.icon} />}
      {children}
    </Button>
  );
}

const styles = ({ palette, spacing }) => ({
  'error-contained': {
    backgroundColor: palette.error.dark,
    color: palette.error.contrastText,
  },
  'error-text': {
    color: palette.error.dark,
  },
  icon: {
    marginRight: spacing.unit,
  },
});

export default withStyles(styles)(SpinningButton);
