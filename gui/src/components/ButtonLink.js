import { Button, withStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

function ButtonLink({ component, icon, children, classes, ...props }) {
  const Component = component;
  const Icon = icon;

  return (
    <Component {...props} component={Link}>
      {Icon && <Icon className={classes.icon} />}
      {children}
    </Component>
  );
}

ButtonLink.defaultProps = {
  component: Button,
};

const styles = ({ spacing }) => ({
  icon: {
    marginRight: spacing.unit,
  },
});

export default withStyles(styles)(ButtonLink);
