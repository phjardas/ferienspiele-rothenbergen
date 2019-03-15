import { Button, Typography } from '@material-ui/core';
import React from 'react';
import config from '../../api/config';
import Date from '../Date';
import H2 from '../H2';
import Alert from '../Alert';

export default function Welcome({ createTestData, geschwisterkind }) {
  const { startDate, endDate, registrationDeadline } = config;

  return (
    <>
      <H2>Anmeldung</H2>
      {geschwisterkind ? (
        <Alert color="info">
          Zur Anmeldung eines Geschwisterkindes haben wir das Formular für Sie schon so weit wie möglich ausgefüllt.
        </Alert>
      ) : (
        <>
          <Typography paragraph>
            Wir freuen uns, dass Sie Ihr Kind bei den Ferienspielen Rothenbergen vom <Date value={startDate} /> bis <Date value={endDate} />{' '}
            anmelden wollen.
          </Typography>
          <Typography paragraph>
            <strong>
              Anmeldeschluss ist am <Date value={registrationDeadline} /> - oder wenn alle Plätze belegt sind.
            </strong>
          </Typography>
          <Typography paragraph>
            Nach der Anmeldung erhalten Sie von uns eine Email mit der Anmeldebestätigung sowie der Einverständniserklärung. Die
            Einverständniserklärung lassen Sie uns bitte unterschrieben von einem/einer Erziehungsberechtigten zukommen. Den
            Teilnahmebeitrag können Sie in bar der Einverständniserklärung beilegen – oder Sie überweisen ihn.
          </Typography>
          <Typography paragraph>
            Bitte beachten Sie, dass die Anmeldung erst vollständig ist, wenn Einverständniserklärung und Teilnahmebeitrag bei uns
            eingegangen sind!
          </Typography>
          <Typography paragraph>
            Bei nachträglichen Änderungen nehmen Sie bitte telefonisch unter <a href="tel:+4960512649">06051 2649</a> oder per Email unter{' '}
            <a href="mailto:gillian.horton-krueger@emk-rothenbergen.de">gillian.horton-krueger@emk-rothenbergen.de</a> Kontakt mit uns auf.
          </Typography>
        </>
      )}
      {createTestData && (
        <Button color="primary" onClick={createTestData}>
          Testdaten erzeugen
        </Button>
      )}
    </>
  );
}
