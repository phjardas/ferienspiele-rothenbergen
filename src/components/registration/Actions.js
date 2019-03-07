import { Button, CircularProgress, withStyles } from '@material-ui/core';
import { Check as CheckIcon, Warning as WarningIcon } from '@material-ui/icons';
import React from 'react';
import Alert from '../Alert';

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

      <Button type="submit" color="primary" variant="contained" disabled={invalid || submitting}>
        {submitting ? <CircularProgress size={24} className={classes.buttonIcon} /> : <CheckIcon className={classes.buttonIcon} />}
        Kostenpflichtig anmelden
      </Button>
    </div>
  );
}

const styles = ({ spacing }) => ({
  root: {
    marginTop: spacing.unit * 2,
  },
  alert: {
    marginBottom: spacing.unit * 2,
  },
  buttonIcon: {
    marginRight: spacing.unit,
  },
});

export default withStyles(styles)(Actions);
