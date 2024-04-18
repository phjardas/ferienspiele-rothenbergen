import { Alert, CircularProgress, Link } from "@mui/material";
import config from "../../api/config";
import { useRegistrationStatus } from "../../api/firestore";
import DateComp from "../Date";

export default function RegistrationStatus({ children }) {
  const { registrationStart } = config;
  const {
    loading,
    error,
    data: { registrationStatus } = {},
  } = useRegistrationStatus();

  if (Date.now() < registrationStart.getTime()) {
    return (
      <Alert severity="info">
        Die Anmeldung ist geöffnet ab dem <DateComp value={registrationStart} />
      </Alert>
    );
  }

  if (loading) return <CircularProgress />;
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
        <Alert severity="error">
          Leider ist die Anmeldefrist für die Kinderferienspiele abgelaufen.
          <br />
          Für eventuelle Rückfragen nehmen Sie bitte telefonisch unter{" "}
          <Link href="tel:+4960512649">06051 2649</Link> oder per Email unter{" "}
          <Link href="mailto:ralf.schweinsberg@emk.de">
            ralf.schweinsberg@emk.de
          </Link>{" "}
          Kontakt mit uns auf.
        </Alert>
      );

    case "maxParticipants":
      return (
        <Alert severity="error">
          Leider sind schon alle Plätze belegt.
          <br />
          Wir bitten um Ihr Verständnis, dass wir keine weiteren Anmeldungen
          entgegennehmen können.
        </Alert>
      );

    default:
      return null;
  }
}
