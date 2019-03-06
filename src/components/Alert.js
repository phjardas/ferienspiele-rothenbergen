import { withStyles } from '@material-ui/core';
import React from 'react';

function Alert({ color, icon, children, className, classes }) {
  const Icon = icon;
  return (
    <div className={`${classes.root} ${classes[color]} ${className || ''}`}>
      {Icon && <Icon className={classes.icon} />}
      {children}
    </div>
  );
}

const styles = ({ palette, spacing, typography }) => ({
  root: {
    ...typography.body1,
    padding: spacing.unit * 2,
    display: 'flex',
    alignItems: 'flex-start',
  },
  error: {
    backgroundColor: palette.error.dark,
    color: palette.error.contrastText,
  },
  icon: {
    marginRight: spacing.unit,
  },
});

export default withStyles(styles)(Alert);
