import { Grid } from '@material-ui/core';
import { Check as SuccessIcon, Warning as WarningIcon } from '@material-ui/icons';
import qs from 'qs';
import React from 'react';
import Alert from '../Alert';
import ButtonLink from '../ButtonLink';
import Date from '../Date';
import H3 from '../H3';
import KuchenInfo from './KuchenInfo';
import PriceInfo from './PriceInfo';
import WaiverInfo from './WaiverInfo';

function createSiblingRegistrationLink(reg) {
  const params = {
    child: { lastName: reg.child.lastName, nextChild: true },
    parent: reg.parent,
    emergencyContact: reg.emergencyContact,
    kuchen: { date: 'geschwister' },
    uebernachtung: reg.uebernachtung,
  };

  return `/anmeldung?${qs.stringify(params)}`;
}

export default function RegistrationDetails({ registration }) {
  const { registeredAt, child, year } = registration;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Alert color="info" icon={SuccessIcon} gutterBottom>
            Hurra! Sie haben {child.firstName} am <Date value={registeredAt} /> zu den Ferienspielen {year} angemeldet.
          </Alert>
          <ButtonLink to={createSiblingRegistrationLink(registration)} color="primary" variant="contained">
            Geschwisterkind anmelden
          </ButtonLink>
        </Grid>
        <Grid item xs={12}>
          <Alert color="error" icon={WarningIcon}>
            Die Anmeldung ist noch nicht abgeschlossen. Bitte beachten Sie die folgenden Hinweise.
          </Alert>
        </Grid>
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
        {/* <Grid item xs={12}>
          <H3>Übernachtung</H3>
          <UebernachtungInfo {...registration} />
        </Grid> */}
      </Grid>
    </>
  );
}
