import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Spinner from './components/Spinner';

const Home = lazy(() => import('./pages/index'));
const Impressum = lazy(() => import('./pages/impressum'));
const Anmeldung = lazy(() => import('./pages/anmeldung'));

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Switch>
          <Route path="/anmeldung" render={() => <Anmeldung />} />
          <Route path="/impressum" render={() => <Impressum />} />
          <Route exact path="/" render={() => <Home />} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
