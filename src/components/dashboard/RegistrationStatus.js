import { ChildCare as ChildIcon, Warning as WarningIcon } from '@material-ui/icons';
import React from 'react';
import ButtonLink from '../ButtonLink';
import Date from '../Date';

export default function RegistrationStatus({ registrationDeadline }) {
  const registrationStatus = 'open';

  switch (registrationStatus) {
    case 'open':
      return (
        <>
          <p>
            <ButtonLink to="/anmeldung" color="primary" variant="contained" icon={ChildIcon}>
              Jetzt anmelden!
            </ButtonLink>
          </p>
          <p>
            Anmeldeschluss ist am <Date value={registrationDeadline} />
          </p>
        </>
      );

    case 'deadlineExpired':
      return (
        <>
          <p>
            <strong>
              <WarningIcon /> Leider ist die Anmeldefrist für die Kinderferienspiele abgelaufen.
            </strong>
          </p>
          <p>
            Für eventuelle Rückfragen nehmen Sie bitte telefonisch unter <a href="tel:+4960512649">06051 2649</a> oder per Email unter
            <a href="mailto:gillian.horton-krueger@emk-rothenbergen.de">gillian.horton-krueger@emk-rothenbergen.de</a> Kontakt mit uns auf.
          </p>
        </>
      );

    case 'maxParticipants':
      return (
        <>
          <p>
            <strong>
              <WarningIcon /> Leider sind schon alle Plätze belegt.
            </strong>
          </p>
          <p>Wir bitten um Ihr Verständnis, dass wir keine weiteren Anmeldungen entgegennehmen können.</p>
        </>
      );

    default:
      return null;
  }
}
