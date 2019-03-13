import { Typography } from '@material-ui/core';
import { Warning as WarningIcon } from '@material-ui/icons';
import React from 'react';
import config from '../../api/config';
import ButtonLink from '../ButtonLink';
import Date from '../Date';

export default function RegistrationStatus() {
  const { registrationDeadline } = config;
  const registrationStatus = 'open';

  switch (registrationStatus) {
    case 'open':
      return (
        <>
          <Typography paragraph>
            <ButtonLink to="/anmeldung" color="primary" variant="contained" size="large">
              Jetzt anmelden!
            </ButtonLink>
          </Typography>
          <Typography paragraph>
            Anmeldeschluss ist am <Date value={registrationDeadline} />
          </Typography>
        </>
      );

    case 'deadlineExpired':
      return (
        <>
          <Typography paragraph>
            <strong>
              <WarningIcon /> Leider ist die Anmeldefrist für die Kinderferienspiele abgelaufen.
            </strong>
          </Typography>
          <Typography paragraph>
            Für eventuelle Rückfragen nehmen Sie bitte telefonisch unter <a href="tel:+4960512649">06051 2649</a> oder per Email unter
            <a href="mailto:gillian.horton-krueger@emk-rothenbergen.de">gillian.horton-krueger@emk-rothenbergen.de</a> Kontakt mit uns auf.
          </Typography>
        </>
      );

    case 'maxParticipants':
      return (
        <>
          <Typography paragraph>
            <strong>
              <WarningIcon /> Leider sind schon alle Plätze belegt.
            </strong>
          </Typography>
          <Typography paragraph>Wir bitten um Ihr Verständnis, dass wir keine weiteren Anmeldungen entgegennehmen können.</Typography>
        </>
      );

    default:
      return null;
  }
}
