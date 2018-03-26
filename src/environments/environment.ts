// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { Environment } from './model';
export * from './model';

export const environment: Environment = {
  production: false,
  hmr: true,
  locale: 'de',
  enableRouterTracing: false,
  title: 'Natur pur!',
  startDate: '2018-06-25',
  endDate: '2018-06-29',
  year: 2018,
  firebase: {
    apiKey: 'AIzaSyDLYUActhO0rHtTMYSHJd8pArejHM9p3bg',
    authDomain: 'ferienspiele-rothenbergen.firebaseapp.com',
    databaseURL: 'https://ferienspiele-rothenbergen.firebaseio.com',
    projectId: 'ferienspiele-rothenbergen',
    storageBucket: '',
    messagingSenderId: '1062224739286',
  },
  paypal: {
    enabled: false,
    environment: 'sandbox',
    clientId: 'AVtfgkP923kAX7lSyCjL8HrVjMEsIozW2ZebWqK5RJgeclf0ofHe2y3k1aRMY3bSXHjEJD951XBMCJ6g',
    testUser: { email: 'philipp+buyer@jardas.de', password: 'sicheres-kennwort' },
  },
};
