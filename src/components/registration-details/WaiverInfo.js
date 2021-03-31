import { Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Assignment as AssignmentIcon } from '@material-ui/icons';
import React from 'react';
import config from '../../api/config';
import Alert from '../Alert';
import Date from '../Date';
import PrintWaiverButton from '../PrintWaiverButton';

export default function WaiverInfo(registration) {
  return (
    <Card>
      <CardHeader avatar={<AssignmentIcon />} title="Einverständniserklärung" />
      <CardContent>
        <Alert color="error">Sie haben die Einverständniserklärung noch nicht abgegeben.</Alert>
      </CardContent>
      <CardContent>
        <Typography paragraph>
          Bitte drucken Sie jetzt die Einverständniserklärung aus und schicken Sie sie{' '}
          <strong>
            bis zum <Date value={config.waiverDeadline} />
          </strong>{' '}
          unterschrieben an uns zurück oder bringen Sie sie im Gemeindebüro vorbei.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <PrintWaiverButton registration={registration} color="primary">
          Einverständniserklärung ausdrucken
        </PrintWaiverButton>
      </CardActions>
    </Card>
  );
}
