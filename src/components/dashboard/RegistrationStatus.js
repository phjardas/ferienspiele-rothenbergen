import { ChildCare as ChildIcon, Warning as WarningIcon } from '@material-ui/icons';
import React from 'react';
import config from '../../api/config';
import ButtonLink from '../ButtonLink';
import Date from '../Date';
import P from '../P';

export default function RegistrationStatus() {
  const { registrationDeadline } = config;
  const registrationStatus = 'open';

  switch (registrationStatus) {
    case 'open':
      return (
        <>
          <P>
            <ButtonLink to="/anmeldung" color="primary" variant="contained" icon={ChildIcon}>
              Jetzt anmelden!
            </ButtonLink>
          </P>
          <P>
            Anmeldeschluss ist am <Date value={registrationDeadline} />
          </P>
        </>
      );

    case 'deadlineExpired':
      return (
        <>
          <P>
            <strong>
              <WarningIcon /> Leider ist die Anmeldefrist für die Kinderferienspiele abgelaufen.
            </strong>
          </P>
          <P>
            Für eventuelle Rückfragen nehmen Sie bitte telefonisch unter <a href="tel:+4960512649">06051 2649</a> oder per Email unter
            <a href="mailto:gillian.horton-krueger@emk-rothenbergen.de">gillian.horton-krueger@emk-rothenbergen.de</a> Kontakt mit uns auf.
          </P>
        </>
      );

    case 'maxParticipants':
      return (
        <>
          <P>
            <strong>
              <WarningIcon /> Leider sind schon alle Plätze belegt.
            </strong>
          </P>
          <P>Wir bitten um Ihr Verständnis, dass wir keine weiteren Anmeldungen entgegennehmen können.</P>
        </>
      );

    default:
      return null;
  }
}
