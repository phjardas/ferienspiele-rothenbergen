export const defaultEnvironment = {
  production: false,
  enableRouterTracing: false,
  title: 'Wunderbar gemacht!',
  year: 2018,
  firebase: {
    apiKey: "AIzaSyDLYUActhO0rHtTMYSHJd8pArejHM9p3bg",
    authDomain: "ferienspiele-rothenbergen.firebaseapp.com",
    databaseURL: "https://ferienspiele-rothenbergen.firebaseio.com",
    projectId: "ferienspiele-rothenbergen",
    storageBucket: "",
    messagingSenderId: "1062224739286"
  },
  paypal: {
    enabled: true,
    environment: 'sandbox',
    clientId: 'AVtfgkP923kAX7lSyCjL8HrVjMEsIozW2ZebWqK5RJgeclf0ofHe2y3k1aRMY3bSXHjEJD951XBMCJ6g',
    testUser: { email: 'philipp+buyer@jardas.de', password: 'sicheres-kennwort' },
  },
};
