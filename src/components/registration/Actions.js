import { withStyles } from '@material-ui/core';
import { Check as CheckIcon, Warning as WarningIcon } from '@material-ui/icons';
import React from 'react';
import Alert from '../Alert';
import SpinningButton from '../SpinningButton';

function Actions({ invalid, submitting, submitError, classes }) {
  return (
    <div className={classes.root}>
      {invalid && !submitError && (
        <Alert color="error" icon={WarningIcon} className={classes.alert}>
          Bitte korrigieren Sie die Fehler im Formular.
        </Alert>
      )}

      {submitError && (
        <Alert color="error" icon={WarningIcon} className={classes.alert}>
          {submitError}
        </Alert>
      )}

      <SpinningButton
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        icon={CheckIcon}
        spinning={submitting}
        disabled={invalid}
        className={classes.button}
      >
        Kostenpflichtig anmelden
      </SpinningButton>
    </div>
  );
}

const styles = ({ spacing }) => ({
  root: {
    marginTop: spacing(2),
  },
  alert: {
    marginBottom: spacing(2),
  },
  button: {
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
  },
});

export default withStyles(styles)(Actions);
