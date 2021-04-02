import { Cake as CakeIcon, Person as PersonIcon } from '@material-ui/icons';
import React, { useMemo } from 'react';
import { useRouteMatch } from 'react-router';
import { isAnmeldungUser, isKuchenUser } from '../../api/rules';
import Anmeldungen from './anmeldungen';
import Kuchen from './kuchen';

export function useOfficeRoutes() {
  const { path } = useRouteMatch('/office');

  return useMemo(
    () => [
      {
        label: 'Anmeldungen',
        route: {
          path: `${path}/anmeldungen`,
          allowed: isAnmeldungUser,
        },
        component: Anmeldungen,
        icon: <PersonIcon />,
      },
      {
        label: 'Kuchen',
        route: {
          path: `${path}/kuchen`,
          allowed: isKuchenUser,
        },
        component: Kuchen,
        icon: <CakeIcon />,
      },
    ],
    [path]
  );
}
