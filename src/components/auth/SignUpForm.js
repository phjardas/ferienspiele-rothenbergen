import { withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { useAuth } from '../../api/auth';
import Alert from '../Alert';
import SpinningButton from '../SpinningButton';
import SignInField from './SignInField';

function SignUpForm({ onSignUp, classes }) {
  const auth = useAuth();
  const [{ loading, error }, setState] = useState({});

  const signIn = async (type, fn) => {
    setState({ loading: type });

    try {
      await fn();
      onSignUp && onSignUp();
    } catch (error) {
      setState({ error });
    }
  };

  const signUpWithEmailAndPassword = async ({ email, password }) => signIn('password', () => auth.signUp(email, password));

  const signUpWithProvider = async providerId => signIn(providerId, () => auth.signInWithProvider(providerId));

  return (
    <div className={classes.root}>
      {error && <Alert color="error">{error.message}</Alert>}
      <Form onSubmit={signUpWithEmailAndPassword}>
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
              className={classes.signUpButton}
            >
              Registrieren
            </SpinningButton>
          </form>
        )}
      </Form>
      {auth.providers.map(provider => (
        <SpinningButton
          key={provider.id}
          onClick={() => signUpWithProvider(provider.id)}
          color="secondary"
          variant="outlined"
          disabled={!!loading}
          spinning={loading === provider.id}
          fullWidth
          className={classes.signUpButton}
        >
          Anmelden mit {provider.label}
        </SpinningButton>
      ))}
    </div>
  );
}

const styles = ({ spacing }) => ({
  root: {
    maxWidth: 300,
  },
  signUpButton: {
    marginTop: spacing.unit * 2,
  },
});

export default withStyles(styles)(SignUpForm);
