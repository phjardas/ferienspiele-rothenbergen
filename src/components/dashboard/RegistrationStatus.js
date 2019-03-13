import { Typography } from '@material-ui/core';
import React from 'react';
import config from '../../api/config';
import Alert from '../Alert';
import ButtonLink from '../ButtonLink';
import DateComp from '../Date';

export default function RegistrationStatus() {
  const { registrationStart, registrationDeadline } = config;
  const registrationStatus = 'open';

  if (Date.now() < registrationStart.getTime()) {
    return (
      <>
        <Typography variant="subtitle2" paragraph>
          Die Anmeldung ist geöffnet ab dem <DateComp value={registrationStart} />
        </Typography>
      </>
    );
  }

  switch (registrationStatus) {
    case 'open':
      return (
        <>
          <Typography paragraph>
            <ButtonLink to="/anmeldung" color="primary" variant="contained" size="large">
              Jetzt anmelden!
            </ButtonLink>
          </Typography>
          <Typography variant="subtitle2" paragraph>
            Anmeldeschluss ist am <DateComp value={registrationDeadline} />
          </Typography>
        </>
      );

    case 'deadlineExpired':
      return (
        <Alert color="error">
          Leider ist die Anmeldefrist für die Kinderferienspiele abgelaufen.
          <br />
          Für eventuelle Rückfragen nehmen Sie bitte telefonisch unter <a href="tel:+4960512649">06051 2649</a> oder per Email unter{' '}
          <a href="mailto:gillian.horton-krueger@emk-rothenbergen.de">gillian.horton-krueger@emk-rothenbergen.de</a> Kontakt mit uns auf.
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
