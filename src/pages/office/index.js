import { Cake as CakeIcon, Person as PersonIcon } from '@material-ui/icons';
import React, { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import NotFound from '../notfound';
import OfficeNav from './OfficeNav';

const Anmeldungen = lazy(() => import('./anmeldungen'));
const AnmeldungDetails = lazy(() => import('./anmeldung-details'));
const Kuchen = lazy(() => import('./kuchen'));

export default function Office({ match }) {
  const routes = [
    {
      label: 'Anmeldungen',
      route: {
        exact: true,
        path: `${match.path}/anmeldungen`,
      },
      component: Anmeldungen,
      icon: <PersonIcon />,
    },
    {
      label: 'Kuchen',
      route: {
        path: `${match.path}/kuchen`,
      },
      component: Kuchen,
      icon: <CakeIcon />,
    },
  ];

  return (
    <>
      <OfficeNav routes={routes} />
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} {...route.route} component={route.component} />
        ))}
        <Route path={`${match.path}/anmeldungen/:id`} component={AnmeldungDetails} />,
        <Route exact path={match.path} render={() => <Redirect to={`${match.path}/anmeldungen`} />} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}
