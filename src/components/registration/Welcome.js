import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import config from '../../api/config';
import Date from '../Date';
import H2 from '../H2';

export default function Welcome({ createTestData }) {
  const { startDate, endDate, registrationDeadline } = config;

  return (
    <>
      <H2>Anmeldung</H2>
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
        Nach der Anmeldung erhalten Sie von uns eine Email mit der Anmeldebestätigung sowie der Einverständniserklärung.
      </Typography>
      <Grid container spacing={16}>
        <Grid item xs={12} md={6}>
          <Typography paragraph>
            Die <strong>Einverständniserklärung</strong> lassen Sie uns bitte unterschrieben von einem/einer Erziehungsberechtigten an
            folgende Adresse zukommen:
          </Typography>
          <Typography paragraph>
            Gemeindebüro Christkönig <br />
            Niedergründauer Straße 20 <br />
            63584 Gründau
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography paragraph>
            Den <strong>Teilnahmebeitrag</strong> können Sie in bar der Einverständniserklärung beilegen – oder Sie überweisen ihn direkt
            an:
          </Typography>
          <Typography paragraph>
            EmK Bezirk Rothenbergen <br />
            IBAN: DE38 5075 0094 0027 0509 92 <br />
            Betreff: NAME DES KINDES, Ferienspiele 2018
          </Typography>
        </Grid>
      </Grid>
      <Typography paragraph>
        Bitte beachten Sie, dass die Anmeldung erst vollständig ist, wenn Einverständniserklärung und Teilnahmebeitrag bei uns eingegangen
        sind!
      </Typography>
      <Typography paragraph>
        Bei nachträglichen Änderungen nehmen Sie bitte telefonisch unter <a href="tel:+4960512649">06051 2649</a> oder per Email unter{' '}
        <a href="mailto:gillian.horton-krueger@emk-rothenbergen.de">gillian.horton-krueger@emk-rothenbergen.de</a> Kontakt mit uns auf.
      </Typography>
      <Typography paragraph>
        <small>Bitte füllen Sie alle Felder aus, es sei denn sie sind mit "optional" gekennzeichnet.</small>
      </Typography>
      {createTestData && (
        <Button color="primary" onClick={createTestData}>
          Testdaten erzeugen
        </Button>
      )}
    </>
  );
}
