import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-final-form";
import { useAuth } from "../../api/auth";
import LinkBehavior from "../LinkBehavior";
import SignInField from "./SignInField";

export default function SignInForm({ onSignIn }) {
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
    signIn("password", () => auth.signInWithEmailAndPassword(email, password));

  const signInWithProvider = async (providerId) =>
    signIn(providerId, () => auth.signInWithProvider(providerId));

  return (
    <Box
      sx={{ maxWidth: 300, display: "flex", flexDirection: "column", gap: 1 }}
    >
      <Form onSubmit={signInWithEmailAndPassword}>
        {({ handleSubmit, invalid }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <SignInField
                name="email"
                type="email"
                label="E-Mail-Adresse"
                required
                autoFocus
              />
              <SignInField
                name="password"
                type="password"
                label="Kennwort"
                required
              />
              {error && <Alert severity="error">{error.message}</Alert>}
              <LoadingButton
                type="submit"
                color="primary"
                variant="contained"
                disabled={!!loading || invalid}
                loading={loading === "password"}
              >
                Anmelden
              </LoadingButton>
            </Box>
          </form>
        )}
      </Form>
      {auth.providers.map((provider) => (
        <LoadingButton
          key={provider.id}
          onClick={() => signInWithProvider(provider.id)}
          color="primary"
          variant="outlined"
          disabled={!!loading}
          loading={loading === provider.id}
        >
          Anmelden mit {provider.label}
        </LoadingButton>
      ))}
      <Button component={LinkBehavior} to="/signup" color="primary">
        Neues Benutzerkonto erstellen
      </Button>
    </Box>
  );
}
