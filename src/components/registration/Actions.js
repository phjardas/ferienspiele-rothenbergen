import { Button, CircularProgress, withStyles } from '@material-ui/core';
import { Check as CheckIcon, Warning as WarningIcon } from '@material-ui/icons';
import React from 'react';
import Alert from '../Alert';

function Actions({ invalid, submitting, classes }) {
  return (
    <>
      {invalid && (
        <Alert color="error" icon={WarningIcon} className={classes.alert}>
          Bitte korrigieren Sie die Fehler im Formular.
        </Alert>
      )}
      <Button type="submit" color="primary" variant="contained" disabled={invalid || submitting} className={classes.button}>
        {submitting ? <CircularProgress className={classes.buttonIcon} /> : <CheckIcon className={classes.buttonIcon} />}
        Kostenpflichtig anmelden
      </Button>
    </>
  );
}

const styles = ({ spacing }) => ({
  alert: {
    marginTop: spacing.unit * 2,
  },
  button: {
    marginTop: spacing.unit * 2,
  },
  buttonIcon: {
    marginRight: spacing.unit,
  },
});

export default withStyles(styles)(Actions);
