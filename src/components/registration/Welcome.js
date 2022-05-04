import { Box, Button, CardActions, Link, Typography } from '@material-ui/core';
import React from 'react';
import config from '../../api/config';
import Alert from '../Alert';
import Card from '../Card';
import CardContent from '../CardContent';
import Date from '../Date';
import H2 from '../H2';

export default function Welcome({ createTestData, geschwisterkind }) {
  const { startDate, endDate, registrationDeadline } = config;

  return (
    <Card>
      <CardContent>
        <H2>Anmeldung</H2>
        {geschwisterkind ? (
          <Alert color="info">
            Zur Anmeldung eines Geschwisterkindes haben wir das Formular für Sie schon so weit wie möglich ausgefüllt.
          </Alert>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Typography>
              Wir freuen uns, dass Sie Ihr Kind bei den Ferienspielen Rothenbergen vom <Date value={startDate} /> bis{' '}
              <Date value={endDate} /> anmelden wollen.
            </Typography>
            <Typography>
              <strong>
                Anmeldeschluss ist am <Date value={registrationDeadline} /> - oder wenn alle Plätze belegt sind.
              </strong>
            </Typography>
            <Typography>
              Nach der Anmeldung erhalten Sie von uns eine Email mit der Anmeldebestätigung sowie der Einverständniserklärung. Die
              Einverständniserklärung lassen Sie uns bitte unterschrieben von einem/einer Erziehungsberechtigten zukommen. Den
              Teilnahmebeitrag können Sie in bar der Einverständniserklärung beilegen – oder Sie überweisen ihn.
            </Typography>
            <Typography>
              Bitte beachten Sie, dass die Anmeldung erst vollständig ist, wenn Einverständniserklärung und Teilnahmebeitrag bei uns
              eingegangen sind!
            </Typography>
            <Typography>
              Bei nachträglichen Änderungen nehmen Sie bitte unter{' '}
              <Link href="mailto:ferienspiele@kirche-aufdemberg.de">ferienspiele@kirche-aufdemberg.de</Link> Kontakt mit uns auf.
            </Typography>
          </Box>
        )}
      </CardContent>
      {createTestData && (
        <CardActions>
          <Button color="primary" onClick={createTestData}>
            Testdaten erzeugen
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
