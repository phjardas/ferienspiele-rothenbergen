import React, { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import NotFound from '../notfound';

const Anmeldungen = lazy(() => import('./anmeldungen'));
const AnmeldungDetails = lazy(() => import('./anmeldung-details'));

export default function Office({ match }) {
  return (
    <Switch>
      <Route exact path={`${match.path}/anmeldungen`} component={Anmeldungen} />
      <Route path={`${match.path}/anmeldungen/:id`} component={AnmeldungDetails} />
      <Route exact path={match.path} render={() => <Redirect to={`${match.path}/anmeldungen`} />} />
      <Route component={NotFound} />
    </Switch>
  );
}
