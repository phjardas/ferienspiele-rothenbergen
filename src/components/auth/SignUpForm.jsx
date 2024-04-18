import { LoadingButton } from "@mui/lab";
import { Alert, Box } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-final-form";
import { useAuth } from "../../api/auth";
import SignInField from "./SignInField";

export default function SignUpForm({ onSignUp }) {
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

  const signUpWithEmailAndPassword = async ({ email, password }) =>
    signIn("password", () => auth.signUp(email, password));

  const signUpWithProvider = async (providerId) =>
    signIn(providerId, () => auth.signInWithProvider(providerId));

  return (
    <Box
      sx={{ maxWidth: 300, display: "flex", flexDirection: "column", gap: 1 }}
    >
      <Form onSubmit={signUpWithEmailAndPassword}>
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
                fullWidth
              >
                Registrieren
              </LoadingButton>
            </Box>
          </form>
        )}
      </Form>
      {auth.providers.map((provider) => (
        <LoadingButton
          key={provider.id}
          onClick={() => signUpWithProvider(provider.id)}
          color="primary"
          variant="outlined"
          disabled={!!loading}
          loading={loading === provider.id}
          fullWidth
        >
          Anmelden mit {provider.label}
        </LoadingButton>
      ))}
    </Box>
  );
}
