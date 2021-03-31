import { withStyles } from '@material-ui/core';
import React from 'react';

function Alert({ color, icon, children, gutterBottom, className, classes }) {
  const Icon = icon;
  return (
    <div className={`${classes.root} ${classes[color]} ${gutterBottom && classes.gutterBottom} ${className || ''}`}>
      {Icon && <Icon className={classes.icon} />}
      <div>{children}</div>
    </div>
  );
}

const styles = ({ palette, spacing, typography }) => ({
  root: {
    ...typography.body1,
    padding: spacing(2),
    display: 'flex',
    alignItems: 'flex-start',
  },
  info: {
    backgroundColor: palette.primary.light,
    color: palette.primary.contrastText,
  },
  error: {
    backgroundColor: palette.error.dark,
    color: palette.error.contrastText,
    '& a': {
      color: 'inherit',
    },
  },
  icon: {
    marginRight: spacing(1),
  },
  gutterBottom: {
    marginBottom: spacing(2),
  },
});

export default withStyles(styles)(Alert);
