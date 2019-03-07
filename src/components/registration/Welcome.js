import { Button, Grid } from '@material-ui/core';
import React from 'react';
import config from '../../api/config';
import H2 from '../H2';
import P from '../P';
import Date from '../Date';

export default function Welcome({ createTestData }) {
  const { startDate, endDate, registrationDeadline } = config;

  return (
    <>
      <H2>Anmeldung</H2>
      <P>
        Wir freuen uns, dass Sie Ihr Kind bei den Ferienspielen Rothenbergen vom <Date value={startDate} /> bis <Date value={endDate} />{' '}
        anmelden wollen.
      </P>
      <P>
        <strong>
          Anmeldeschluss ist am <Date value={registrationDeadline} /> - oder wenn alle Plätze belegt sind.
        </strong>
      </P>
      <P>Nach der Anmeldung erhalten Sie von uns eine Email mit der Anmeldebestätigung sowie der Einverständniserklärung.</P>
      <Grid container spacing={16}>
        <Grid item xs={12} md={6}>
          <P>
            Die <strong>Einverständniserklärung</strong> lassen Sie uns bitte unterschrieben von einem/einer Erziehungsberechtigten an
            folgende Adresse zukommen:
          </P>
          <P>
            Gemeindebüro Christkönig <br />
            Niedergründauer Straße 20 <br />
            63584 Gründau
          </P>
        </Grid>
        <Grid item xs={12} md={6}>
          <P>
            Den <strong>Teilnahmebeitrag</strong> können Sie in bar der Einverständniserklärung beilegen – oder Sie überweisen ihn direkt
            an:
          </P>
          <P>
            EmK Bezirk Rothenbergen <br />
            IBAN: DE38 5075 0094 0027 0509 92 <br />
            Betreff: NAME DES KINDES, Ferienspiele 2018
          </P>
        </Grid>
      </Grid>
      <P>
        Bitte beachten Sie, dass die Anmeldung erst vollständig ist, wenn Einverständniserklärung und Teilnahmebeitrag bei uns eingegangen
        sind!
      </P>
      <P>
        Bei nachträglichen Änderungen nehmen Sie bitte telefonisch unter <a href="tel:+4960512649">06051 2649</a> oder per Email unter{' '}
        <a href="mailto:gillian.horton-krueger@emk-rothenbergen.de">gillian.horton-krueger@emk-rothenbergen.de</a> Kontakt mit uns auf.
      </P>
      <P>
        <small>Bitte füllen Sie alle Felder aus, es sei denn sie sind mit "optional" gekennzeichnet.</small>
      </P>
      {createTestData && (
        <Button color="primary" onClick={createTestData}>
          Testdaten erzeugen
        </Button>
      )}
    </>
  );
}
