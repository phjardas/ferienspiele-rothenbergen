import { Cake as CakeIcon, Person as PersonIcon } from '@material-ui/icons';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useAuth } from '../../api/auth';
import { isKuchenUser, isOfficeUser } from '../../api/rules';
import ProtectedRoute from '../../components/ProtectedRoute';
import NotFound from '../notfound';
import AnmeldungDetails from './anmeldung-details';
import Anmeldungen from './anmeldungen';
import Kuchen from './kuchen';
import OfficeNav from './OfficeNav';

export default function Office({ match }) {
  const auth = useAuth();

  const routes = [
    {
      label: 'Anmeldungen',
      route: {
        path: `${match.path}/anmeldungen`,
        allowed: isOfficeUser,
      },
      component: Anmeldungen,
      icon: <PersonIcon />,
    },
    {
      label: 'Kuchen',
      route: {
        path: `${match.path}/kuchen`,
        allowed: isKuchenUser,
      },
      component: Kuchen,
      icon: <CakeIcon />,
    },
  ];

  return (
    <>
      <Switch>
        <Route exact path={match.path} render={() => <Redirect to={`${match.path}/${isOfficeUser(auth) ? 'anmeldungen' : 'kuchen'}`} />} />
        <>
          <OfficeNav routes={routes} />
          <Switch>
            <ProtectedRoute allowed={isOfficeUser} path={`${match.path}/anmeldungen/:id`} component={AnmeldungDetails} />,
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
