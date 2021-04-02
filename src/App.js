import React, { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './api/auth';
import { isOfficeUser } from './api/rules';
import GlobalLoader from './components/GlobalLoader';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/index';
import NotFound from './pages/notfound';
import './styles.css';
import ThemeProvider from './Theme';

const Impressum = lazy(() => import('./pages/impressum'));
const Datenschutz = lazy(() => import('./pages/datenschutz'));
const Teilnahmebedingungen = lazy(() => import('./pages/teilnahmebedingungen'));
const Anmeldung = lazy(() => import('./pages/anmeldung'));
const AnmeldungDetails = lazy(() => import('./pages/anmeldung-details'));
const SignIn = lazy(() => import('./pages/signin'));
const SignUp = lazy(() => import('./pages/signup'));
const Office = lazy(() => import('./pages/office'));

export default function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider>
            <Suspense fallback={<GlobalLoader />}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/anmeldung/:id" component={AnmeldungDetails} />
                <Route path="/anmeldung" component={Anmeldung} />
                <Route path="/impressum" component={Impressum} />
                <Route path="/datenschutz" component={Datenschutz} />
                <Route path="/teilnahmebedingungen" component={Teilnahmebedingungen} />
                <ProtectedRoute path="/office" allowed={isOfficeUser} component={Office} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}
