import React from 'react';
import { Alert, Button } from 'reactstrap';
import Icon from '../Icon';
import Spinner from '../Spinner';

export default function Actions({ invalid, submitting }) {
  return (
    <div className="mt-5 mb-5">
      {invalid && (
        <Alert color="danger">
          <Icon icon="exclamation-triangle" className="mr-2" />
          Bitte korrigieren Sie die Fehler im Formular.
        </Alert>
      )}

      <Button color="primary" disabled={invalid || submitting}>
        {submitting ? <Spinner inverse className="mr-2" /> : <Icon icon="check" className="mr-2" />}
        Kostenpflichtig anmelden
      </Button>
    </div>
  );
}
