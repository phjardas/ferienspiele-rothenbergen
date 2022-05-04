import { makeStyles, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import { useAuth } from '../../api/auth';
import { useOfficeRoutes } from './routes';

const useStyles = makeStyles(({ palette, spacing }) => ({
  tabs: {
    marginBottom: spacing(3),
    borderBottom: `1px solid ${palette.divider}`,
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

export default function OfficeNav() {
  const classes = useStyles();
  const auth = useAuth();
  const { path } = useRouteMatch('/office');
  const routes = useOfficeRoutes();

  return (
    <Route path={`${path}/:tab`}>
      {({ match: inner }) => (
        <Tabs value={`${path}/${inner.params.tab}`} indicatorColor="primary" textColor="primary" centered className={classes.tabs}>
          {routes
            .filter((route) => route.route.allowed(auth))
            .map((route) => (
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
      )}
    </Route>
  );
}
