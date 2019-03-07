import { Card, CardContent, CardHeader, CardActions, Button } from '@material-ui/core';
import { Assignment as AssignmentIcon } from '@material-ui/icons';
import React from 'react';
import Alert from '../Alert';

export default function WaiverInfo() {
  return (
    <Card>
      <CardHeader avatar={<AssignmentIcon />} title="Einverständniserklärung" />
      <CardContent>
        <Alert color="error">Sie haben die Einverständniserklärung noch nicht abgegeben.</Alert>
      </CardContent>
      <CardActions>
        <Button color="primary">Einverständniserklärung ausdrucken</Button>
      </CardActions>
    </Card>
  );
}
