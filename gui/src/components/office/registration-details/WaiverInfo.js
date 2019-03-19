import { Button, Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import { Assignment as AssignmentIcon } from '@material-ui/icons';
import React from 'react';
import { createWaiver } from '../../../api/waiver';
import Alert from '../../Alert';
import Date from '../../Date';
import SpinningButton from '../../SpinningButton';

export default function WaiverInfo({ setWaiverReceived, ...registration }) {
  const printWaiver = async () => {
    try {
      const blob = createWaiver(registration);
      const { document } = window;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Einverständniserklärung ${registration.child.firstName} ${registration.child.lastName}.pdf`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error printing waiver:', error);
      alert('Das Drucken der Einverständniserklärung hat leider nicht funktioniert.');
    }
  };

  return (
    <Card>
      <CardHeader avatar={<AssignmentIcon />} title="Einverständniserklärung" />
      <CardContent>
        {registration.waiver ? (
          <Alert color="info">
            Einverständniserklärung erhalten am <Date value={registration.waiver.receivedAt} />.
          </Alert>
        ) : (
          <Alert color="error">Noch nicht abgegeben.</Alert>
        )}
      </CardContent>
      <CardActions disableActionSpacing>
        {registration.waiver ? (
          <SpinningButton color="error" onClick={() => setWaiverReceived(false)}>
            Einverständnis doch nicht erhalten
          </SpinningButton>
        ) : (
          <SpinningButton color="primary" variant="contained" onClick={() => setWaiverReceived(true)}>
            Einverständnis erhalten
          </SpinningButton>
        )}
        <Button color="primary" onClick={printWaiver}>
          drucken
        </Button>
      </CardActions>
    </Card>
  );
}
