import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Assignment as AssignmentIcon } from '@material-ui/icons';
import React from 'react';
import config from '../../api/config';
import { createWaiver } from '../../api/waiver';
import Alert from '../Alert';
import Date from '../Date';

export default function WaiverInfo(registration) {
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
        <Typography paragraph>
          Sie können das Geld und die Einverstädniserklärung auch im Sekretariat der Anton Calaminus Schule in Rothenbergen abgeben.
        </Typography>
      </CardContent>
      <CardActions disableActionSpacing>
        <Button color="primary" onClick={printWaiver}>
          Einverständniserklärung ausdrucken
        </Button>
      </CardActions>
    </Card>
  );
}
