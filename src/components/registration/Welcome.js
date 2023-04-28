import { Button, CardActions, Link, Typography } from '@material-ui/core';
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
          <>
            <Typography paragraph>
              Wir freuen uns, dass Sie Ihr Kind bei den Ferienspielen Rothenbergen vom <Date value={startDate} /> bis{' '}
              <Date value={endDate} /> (jeweils 9.00 Uhr bis 16.00 Uhr) anmelden wollen.
            </Typography>
            <Typography paragraph>
              <strong>
                Anmeldeschluss ist am <Date value={registrationDeadline} /> - oder wenn alle Plätze belegt sind.
              </strong>
            </Typography>
            <Typography paragraph>
              Nach der Anmeldung erhalten Sie von uns eine Email mit der Anmeldebestätigung sowie der Einverständniserklärung. Die
              Einverständniserklärung lassen Sie uns bitte unterschrieben zukommen. Den Teilnahmebeitrag können Sie in bar der
              Einverständniserklärung beilegen oder auf das angegebene Konto überweisen.
            </Typography>
            <Typography paragraph>
              Bitte beachten Sie, dass die Anmeldung erst vollständig ist, wenn Einverständniserklärung und Teilnahmebeitrag bei uns
              eingegangen sind!
            </Typography>
            <Typography>
              Bei nachträglichen Änderungen nehmen Sie bitte unter{' '}
              <Link href="mailto:ferienspiele@kirche-aufdemberg.de">ferienspiele@kirche-aufdemberg.de</Link> Kontakt mit uns auf.
            </Typography>
          </>
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
