import { Send as SendIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Alert, Box } from "@mui/material";
import React from "react";

export default function Actions({ invalid, submitting, submitError }) {
  return (
    <Box sx={{ mt: 2 }}>
      {invalid && !submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Bitte korrigieren Sie die Fehler im Formular.
        </Alert>
      )}
      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}
      <LoadingButton
        type="submit"
        color="tertiary"
        variant="contained"
        size="large"
        fullWidth
        startIcon={<SendIcon />}
        loading={submitting}
        disabled={invalid}
      >
        Kostenpflichtig anmelden
      </LoadingButton>
    </Box>
  );
}
