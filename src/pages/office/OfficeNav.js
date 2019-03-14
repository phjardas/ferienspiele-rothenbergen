import { Paper, Tab, Tabs, withStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useRouter } from '../../api/router';

function OfficeNav({ routes, classes }) {
  const { location } = useRouter();

  return (
    <Paper square className={classes.tabs}>
      <Tabs value={location.pathname} indicatorColor="primary" textColor="primary">
        {routes.map(route => (
          <Tab
            key={route.route.path}
            value={route.route.path}
            component={Link}
            to={route.route.path}
            label={route.label}
            icon={route.icon}
            className={classes.link}
          />
        ))}
      </Tabs>
    </Paper>
  );
}

const styles = ({ shadows, spacing }) => ({
  tabs: {
    marginTop: -spacing.unit * 3,
    marginLeft: -spacing.unit * 3,
    marginRight: -spacing.unit * 3,
    marginBottom: spacing.unit * 3,
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
});

export default withStyles(styles)(OfficeNav);
