import { Cake as CakeIcon, Person as PersonIcon } from '@material-ui/icons';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import NotFound from '../notfound';
import AnmeldungDetails from './anmeldung-details';
import Anmeldungen from './anmeldungen';
import Kuchen from './kuchen';
import OfficeNav from './OfficeNav';

export default function Office({ match }) {
  const routes = [
    {
      label: 'Anmeldungen',
      route: {
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
      <Switch>
        <Route exact path={match.path} render={() => <Redirect to={`${match.path}/anmeldungen`} />} />
        <>
          <OfficeNav routes={routes} />
          <Switch>
            <Route path={`${match.path}/anmeldungen/:id`} component={AnmeldungDetails} />,
            {routes.map((route, i) => (
              <Route key={i} {...route.route} component={route.component} />
            ))}
            <Route component={NotFound} />
          </Switch>
        </>
      </Switch>
    </>
  );
}
