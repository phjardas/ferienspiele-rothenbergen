import { Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { useAuth } from '../../api/auth';
import Alert from '../Alert';
import ButtonLink from '../ButtonLink';
import SpinningButton from '../SpinningButton';
import SignInField from './SignInField';

function SignInForm({ from = '/', onSignIn, classes }) {
  const auth = useAuth();
  const [{ loading, error }, setState] = useState({});

  const signIn = async (type, fn) => {
    setState({ loading: type });

    try {
      await fn();
      onSignIn && onSignIn();
    } catch (error) {
      setState({ error });
    }
  };

  const signInWithEmailAndPassword = async ({ email, password }) =>
    signIn('password', () => auth.signInWithEmailAndPassword(email, password));

  const signInWithProvider = async providerId => signIn(providerId, () => auth.signInWithProvider(providerId));

  return (
    <div className={classes.root}>
      {error && <Alert color="error">{error.message}</Alert>}
      <Form onSubmit={signInWithEmailAndPassword}>
        {({ handleSubmit, invalid }) => (
          <form onSubmit={handleSubmit} noValidate>
            <SignInField name="email" type="email" label="E-Mail-Adresse" required autoFocus />
            <SignInField name="password" type="password" label="Kennwort" required />
            <SpinningButton
              type="submit"
              color="primary"
              variant="contained"
              disabled={!!loading || invalid}
              spinning={loading === 'password'}
              fullWidth
              className={classes.signInButton}
            >
              anmelden
            </SpinningButton>
          </form>
        )}
      </Form>
      {auth.providers.map(provider => (
        <SpinningButton
          key={provider.id}
          onClick={() => signInWithProvider(provider.id)}
          color="secondary"
          variant="outlined"
          disabled={!!loading}
          spinning={loading === provider.id}
          fullWidth
          className={classes.signInButton}
        >
          Anmelden mit {provider.label}
        </SpinningButton>
      ))}
      <Typography>
        <ButtonLink to={{ pathname: '/signup', state: { from } }} color="primary" fullWidth className={classes.signInButton}>
          Neues Benutzerkonto erstellen
        </ButtonLink>
      </Typography>
    </div>
  );
}

const styles = ({ spacing }) => ({
  root: {
    maxWidth: 300,
  },
  signInButton: {
    marginTop: spacing.unit * 2,
  },
});

export default withStyles(styles)(SignInForm);
