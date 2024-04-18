import { Alert, LinearProgress, Link } from "@mui/material";
import config from "../../api/config";
import { useRegistrationStatus } from "../../api/firestore";
import FormattedDate from "../Date";
import RegistrationCodeWrapper from "./RegistrationCodeWrapper";

export default function RegistrationStatus({ code, children }) {
  const { registrationStart } = config;
  const {
    loading,
    error,
    data: { registrationStatus } = {},
  } = useRegistrationStatus();

  if (Date.now() < registrationStart.getTime()) {
    return (
      <RegistrationCodeWrapper
        code={code}
        fallback={
          <Alert severity="error">
            Die Anmeldung ist geöffnet ab{" "}
            <FormattedDate
              value={registrationStart}
              dateStyle="full"
              timeStyle="short"
            />
          </Alert>
        }
      >
        {children}
      </RegistrationCodeWrapper>
    );
  }

  if (loading) return <LinearProgress />;
  if (error)
    return (
      <Alert severity="error">
        Hoppla, da ist leider etwas schiefgegangen: {error.message}
      </Alert>
    );

  switch (registrationStatus) {
    case "open":
      return children;

    case "deadlineExpired":
      return (
        <RegistrationCodeWrapper
          code={code}
          fallback={
            <Alert severity="error">
              Leider ist die Anmeldefrist für die Kinderferienspiele abgelaufen.
              <br />
              Für eventuelle Rückfragen nehmen Sie bitte telefonisch unter{" "}
              <Link href="tel:+4960512649">06051 2649</Link> oder per Email
              unter{" "}
              <Link href="mailto:ralf.schweinsberg@emk.de">
                ralf.schweinsberg@emk.de
              </Link>{" "}
              Kontakt mit uns auf.
            </Alert>
          }
        >
          {children}
        </RegistrationCodeWrapper>
      );

    case "maxParticipants":
      return (
        <RegistrationCodeWrapper
          code={code}
          fallback={
            <Alert severity="error">
              Leider sind schon alle Plätze belegt.
              <br />
              Wir bitten um Ihr Verständnis, dass wir keine weiteren Anmeldungen
              entgegennehmen können.
            </Alert>
          }
        >
          {children}
        </RegistrationCodeWrapper>
      );

    default:
      return null;
  }
}
