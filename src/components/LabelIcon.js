import { withStyles } from '@material-ui/core';
import React from 'react';

function LabelIcon({ icon, label, classes, className, ...props }) {
  const Icon = icon;

  return (
    <span className={`${classes.root} ${className || ''}`} {...props}>
      <Icon className={label ? classes.iconWithLabel : undefined} />
      {label}
    </span>
  );
}

const styles = ({ spacing }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  iconWithLabel: {
    marginRight: spacing.unit,
  },
});

export default withStyles(styles)(LabelIcon);
