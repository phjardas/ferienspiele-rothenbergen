import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './api/auth';
import GlobalLoader from './components/GlobalLoader';
import Layout from './components/Layout';
import NotFound from './pages/notfound';
import './styles.css';
import ThemeProvider from './Theme';

const Home = lazy(() => import('./pages/index'));
const Impressum = lazy(() => import('./pages/impressum'));
const Anmeldung = lazy(() => import('./pages/anmeldung'));
const AnmeldungDetails = lazy(() => import('./pages/anmeldung-details'));
const SignIn = lazy(() => import('./pages/signin'));
const SignUp = lazy(() => import('./pages/signup'));

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Suspense fallback={<GlobalLoader />}>
            <Switch>
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Layout>
                <Suspense fallback={<GlobalLoader />}>
                  <Switch>
                    <Route path="/anmeldung/:id" component={AnmeldungDetails} />
                    <Route path="/anmeldung" component={Anmeldung} />
                    <Route path="/impressum" component={Impressum} />
                    <Route exact path="/" component={Home} />
                    <Route component={NotFound} />
                  </Switch>
                </Suspense>
              </Layout>
            </Switch>
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
