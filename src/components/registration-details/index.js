import { Grid, Typography, withStyles } from '@material-ui/core';
import { Warning as WarningIcon } from '@material-ui/icons';
import qs from 'qs';
import React from 'react';
import Alert from '../Alert';
import ButtonLink from '../ButtonLink';
import Date from '../Date';
import H3 from '../H3';
import KuchenInfo from './KuchenInfo';
import PriceInfo from './PriceInfo';
import UebernachtungInfo from './UebernachtungInfo';
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

function RegistrationDetails({ registration, classes }) {
  const { registeredAt, child, year } = registration;

  return (
    <>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="body1">
            Hurra! Sie haben {child.firstName} am <Date value={registeredAt} /> zu den Ferienspielen {year} angemeldet.
            <ButtonLink
              to={createSiblingRegistrationLink(registration)}
              color="primary"
              variant="contained"
              className={classes.siblingButton}
            >
              Geschwisterkind anmelden
            </ButtonLink>
          </Typography>
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
        <Grid item xs={12}>
          <H3>Übernachtung</H3>
          <UebernachtungInfo {...registration} />
        </Grid>
      </Grid>
    </>
  );
}

const styles = ({ spacing }) => ({
  siblingButton: {
    marginLeft: spacing.unit,
  },
});

export default withStyles(styles)(RegistrationDetails);
