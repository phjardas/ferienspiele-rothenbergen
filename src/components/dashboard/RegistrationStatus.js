import { Typography, CircularProgress } from '@material-ui/core';
import React from 'react';
import config from '../../api/config';
import { useRegistrationStatus } from '../../api/firestore';
import Alert from '../Alert';
import ButtonLink from '../ButtonLink';
import DateComp from '../Date';

export default function RegistrationStatus() {
  const { registrationStart, registrationDeadline } = config;
  const { loading, error, data: { registrationStatus, spotsLeft } = {} } = useRegistrationStatus();

  if (Date.now() < registrationStart.getTime()) {
    return (
      <>
        <Typography variant="subtitle2" paragraph>
          Die Anmeldung ist geöffnet ab dem <DateComp value={registrationStart} />
        </Typography>
      </>
    );
  }

  if (loading) return <CircularProgress />;
  if (error) return <Alert color="error">Hoppla, da ist leider etwas schiefgegangen: {error.message}</Alert>;

  switch (registrationStatus) {
    case 'open':
      return (
        <>
          <Typography paragraph>
            <ButtonLink to="/anmeldung" color="primary" variant="contained" size="large">
              Jetzt anmelden!
            </ButtonLink>
            {spotsLeft < 10 && <span style={{ marginLeft: 16 }}>Nur noch {spotsLeft} Plätze frei!</span>}
          </Typography>
          <Typography variant="subtitle2" paragraph>
            Anmeldeschluss ist am <DateComp value={registrationDeadline} />.
          </Typography>
        </>
      );

    case 'deadlineExpired':
      return (
        <Alert color="error">
          Leider ist die Anmeldefrist für die Kinderferienspiele abgelaufen.
          <br />
          Für eventuelle Rückfragen nehmen Sie bitte telefonisch unter <a href="tel:+4960512649">06051 2649</a> oder per Email unter{' '}
          <a href="mailto:ralf.schweinsberg@emk.de">ralf.schweinsberg@emk.de</a> Kontakt mit uns auf.
        </Alert>
      );

    case 'maxParticipants':
      return (
        <Alert color="error">
          Leider sind schon alle Plätze belegt.
          <br />
          Wir bitten um Ihr Verständnis, dass wir keine weiteren Anmeldungen entgegennehmen können.
        </Alert>
      );

    default:
      return null;
  }
}
