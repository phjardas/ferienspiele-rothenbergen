import { Tab, Tabs, withStyles } from '@material-ui/core';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useRouter } from '../../api/router';

function OfficeNav({ routes, classes }) {
  const { match } = useRouter();

  return (
    <Route path={`${match.path}/:tab`}>
      {({ match: inner }) => (
        <Tabs value={`${match.path}/${inner.params.tab}`} indicatorColor="primary" textColor="primary" className={classes.tabs}>
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
      )}
    </Route>
  );
}

const styles = ({ palette, spacing }) => ({
  tabs: {
    marginTop: -spacing.unit * 3,
    marginLeft: -spacing.unit * 3,
    marginRight: -spacing.unit * 3,
    marginBottom: spacing.unit * 3,
    borderBottom: `1px solid ${palette.divider}`,
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
});

export default withStyles(styles)(OfficeNav);