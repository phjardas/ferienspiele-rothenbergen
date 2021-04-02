import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import { useAuth } from '../../api/auth';
import { isAnmeldungUser } from '../../api/rules';
import ProtectedRoute from '../../components/ProtectedRoute';
import NotFound from '../notfound';
import AnmeldungDetails from './anmeldung-details';
import { useOfficeRoutes } from './routes';

export default function Office() {
  const auth = useAuth();
  const { path } = useRouteMatch();
  const routes = useOfficeRoutes();

  return (
    <>
      <Switch>
        <Route exact path={path} render={() => <Redirect to={`${path}/${isAnmeldungUser(auth) ? 'anmeldungen' : 'kuchen'}`} />} />
        <>
          <Switch>
            <ProtectedRoute allowed={isAnmeldungUser} path={`${path}/anmeldungen/:id`} component={AnmeldungDetails} />,
            {routes.map((route, i) => (
              <ProtectedRoute key={i} {...route.route} component={route.component} />
            ))}
            <Route component={NotFound} />
          </Switch>
        </>
      </Switch>
    </>
  );
}
