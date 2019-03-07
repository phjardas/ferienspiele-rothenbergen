import { Grid, Typography } from '@material-ui/core';
import { Warning as WarningIcon } from '@material-ui/icons';
import React from 'react';
import Alert from '../Alert';
import Date from '../Date';
import H2 from '../H2';
import H3 from '../H3';
import KuchenInfo from './KuchenInfo';
import PriceInfo from './PriceInfo';
import UebernachtungInfo from './UebernachtungInfo';
import WaiverInfo from './WaiverInfo';

export default function RegistrationDetails({ registration }) {
  const { registeredAt, child, year } = registration;

  return (
    <>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <H2>
            {child.firstName} {child.lastName}
          </H2>
          <Typography variant="body1">
            Hurra! Sie haben {child.firstName} am <Date value={registeredAt} /> zu den Ferienspielen {year} angemeldet.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Alert color="error" icon={WarningIcon}>
            Die Anmeldung ist noch nicht abgeschlossen. Bitte beachten Sie die folgenden Hinweise.
          </Alert>
        </Grid>{' '}
        <Grid item xs={12} md={6}>
          <PriceInfo {...registration} />
        </Grid>
        <Grid item xs={12} md={6}>
          <WaiverInfo {...registration} />
        </Grid>
        <Grid item xs={12}>
          <H3>Kuchen</H3>
          <KuchenInfo {...registration} />
        </Grid>
        <Grid item xs={12}>
          <H3>Uebernachtung</H3>
          <UebernachtungInfo {...registration} />
        </Grid>
      </Grid>

      <pre>{JSON.stringify(registration, null, 2)}</pre>
    </>
  );
}
