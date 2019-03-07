import { Grid, withStyles } from '@material-ui/core';
import { TextField } from 'final-form-material-ui';
import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useAuth } from '../../api/auth';
import Alert from '../Alert';
import { required } from '../form/validation';
import H3 from '../H3';
import SpinningButton from '../SpinningButton';

function SignInForm({ dense, onSignIn, classes }) {
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

  const spacing = dense ? 16 : 24;

  return (
    <>
      <Grid container spacing={spacing}>
        {error && (
          <Grid item xs={12}>
            <Alert color="error">{error.message}</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <Form onSubmit={signInWithEmailAndPassword}>
            {({ handleSubmit, invalid }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={spacing}>
                  <Grid item>
                    <Field name="email" type="email" component={TextField} label="E-Mail-Adresse" required validate={required} autoFocus />
                  </Grid>
                  <Grid item>
                    <Field name="password" type="password" component={TextField} label="Kennwort" required validate={required} />
                  </Grid>
                  <Grid item>
                    <SpinningButton
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={!!loading || invalid}
                      spinning={loading === 'password'}
                      className={classes.passwordButton}
                    >
                      anmelden
                    </SpinningButton>
                  </Grid>
                </Grid>
              </form>
            )}
          </Form>
        </Grid>
        <Grid item xs={12} container spacing={spacing}>
          <Grid item>
            <H3>Oder mit:</H3>
          </Grid>
          {auth.providers.map(provider => (
            <Grid key={provider.id} item>
              <SpinningButton
                onClick={() => signInWithProvider(provider.id)}
                color="primary"
                variant="contained"
                disabled={!!loading}
                spinning={loading === provider.id}
              >
                {provider.label}
              </SpinningButton>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

const styles = ({ spacing }) => ({
  passwordButton: {
    marginTop: spacing.unit * 2,
  },
});

export default withStyles(styles)(SignInForm);
