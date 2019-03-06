import { Button, Grid, withStyles } from '@material-ui/core';
import React from 'react';
import config from '../../api/config';

function Welcome({ updateTestData, classes }) {
  const { startDate, endDate, registrationDeadline } = config;

  return (
    <div className={classes.root}>
      <h2>Anmeldung</h2>
      <p>
        Wir freuen uns, dass Sie Ihr Kind bei den Ferienspielen Rothenbergen vom {startDate.toLocaleDateString()} bis{' '}
        {endDate.toLocaleDateString()} anmelden wollen.{' '}
        <strong>Anmeldeschluss ist am {registrationDeadline.toLocaleDateString()} - oder wenn alle Plätze belegt sind.</strong>
      </p>
      <p>Nach der Anmeldung erhalten Sie von uns eine Email mit der Anmeldebestätigung sowie der Einverständniserklärung.</p>
      <Grid container spacing={16}>
        <Grid item xs={12} md={6}>
          <p>
            Die <strong>Einverständniserklärung</strong> lassen Sie uns bitte unterschrieben von einem/einer Erziehungsberechtigten an
            folgende Adresse zukommen:
          </p>
          <p>
            Gemeindebüro Christkönig <br />
            Niedergründauer Straße 20 <br />
            63584 Gründau
          </p>
        </Grid>
        <Grid item xs={12} md={6}>
          <p>
            Den <strong>Teilnahmebeitrag</strong> können Sie in bar der Einverständniserklärung beilegen – oder Sie überweisen ihn direkt
            an:
          </p>
          <p>
            EmK Bezirk Rothenbergen <br />
            IBAN: DE38 5075 0094 0027 0509 92 <br />
            Betreff: NAME DES KINDES, Ferienspiele 2018
          </p>
        </Grid>
      </Grid>
      <p>
        Bitte beachten Sie, dass die Anmeldung erst vollständig ist, wenn Einverständniserklärung und Teilnahmebeitrag bei uns eingegangen
        sind!
      </p>
      <p>
        Bei nachträglichen Änderungen nehmen Sie bitte telefonisch unter <a href="tel:+4960512649">06051 2649</a> oder per Email unter{' '}
        <a href="mailto:gillian.horton-krueger@emk-rothenbergen.de">gillian.horton-krueger@emk-rothenbergen.de</a> Kontakt mit uns auf.
      </p>
      <p>
        <small>Bitte füllen Sie alle Felder aus, es sei denn sie sind mit "optional" gekennzeichnet.</small>
      </p>
      {updateTestData && (
        <Button color="primary" onClick={updateTestData}>
          Testdaten erzeugen
        </Button>
      )}
    </div>
  );
}

const styles = ({ spacing, typography }) => ({
  root: {
    ...typography.body1,
    marginTop: spacing.unit * 2,
  },
});

export default withStyles(styles)(Welcome);
