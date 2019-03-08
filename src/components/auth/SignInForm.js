import { withStyles } from '@material-ui/core';
import { TextField } from 'final-form-material-ui';
import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useAuth } from '../../api/auth';
import Alert from '../Alert';
import { required } from '../form/validation';
import SpinningButton from '../SpinningButton';

function SignInForm({ onSignIn, classes }) {
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
            <Field
              name="email"
              type="email"
              component={TextField}
              label="E-Mail-Adresse"
              required
              validate={required}
              autoFocus
              fullWidth
              margin="dense"
            />
            <Field
              name="password"
              type="password"
              component={TextField}
              label="Kennwort"
              required
              validate={required}
              fullWidth
              margin="dense"
            />
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
          Login mit {provider.label}
        </SpinningButton>
      ))}
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
