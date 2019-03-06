import { withStyles } from '@material-ui/core';
import React from 'react';

function WithIcon({ icon, children, classes }) {
  const Icon = icon;
  return (
    <div className={classes.root}>
      {Icon && <Icon className={classes.icon} />}
      {children}
    </div>
  );
}

const styles = ({ spacing, typography }) => ({
  root: {
    ...typography.body1,
    display: 'flex',
    alignItems: 'baseline',
  },
  icon: {
    marginRight: spacing.unit,
  },
});

export default withStyles(styles)(WithIcon);
