import { Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import { Assignment as AssignmentIcon } from '@material-ui/icons';
import React from 'react';
import Alert from '../../Alert';
import Date from '../../Date';
import PrintWaiverButton from '../../PrintWaiverButton';
import SpinningButton from '../../SpinningButton';

export default function WaiverInfo({ setWaiverReceived, ...registration }) {
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
        <PrintWaiverButton color="primary" registration={registration}>
          drucken
        </PrintWaiverButton>
      </CardActions>
    </Card>
  );
}
