import { Alert, Button, LinearProgress, Link, Typography } from "@mui/material";
import React from "react";
import config from "../../api/config";
import { useRegistrationStatus } from "../../api/firestore";
import DateComp from "../Date";
import LinkBehavior from "../LinkBehavior";

export default function RegistrationStatus({ children }) {
  const { registrationStart, registrationDeadline } = config;
  const {
    loading,
    error,
    data: { registrationStatus, spotsLeft } = {},
  } = useRegistrationStatus();

  if (Date.now() < registrationStart.getTime()) {
    return (
      <Typography variant="subtitle2">
        Die Anmeldung ist geöffnet ab{" "}
        <DateComp
          value={registrationStart}
          dateStyle="full"
          timeStyle="short"
        />
      </Typography>
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
      return (
        <>
          <Typography>
            <Button
              component={LinkBehavior}
              href="/anmeldung"
              color="secondary"
              variant="contained"
              size="large"
            >
              Jetzt anmelden!
            </Button>
            {spotsLeft < 10 && (
              <span style={{ marginLeft: 16 }}>
                Nur noch {spotsLeft} Plätze frei!
              </span>
            )}
          </Typography>
          <Typography variant="subtitle2">
            Anmeldeschluss ist am <DateComp value={registrationDeadline} />.
          </Typography>
        </>
      );

    case "deadlineExpired":
      return (
        <Alert severity="error">
          Leider ist die Anmeldefrist für die Kinderferienspiele abgelaufen. Sie
          können sich aber gerne in unsere{" "}
          <Link href="https://forms.churchdesk.com/f/RiTAxzb5lO">
            Warteliste
          </Link>{" "}
          eintragen.
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
          <br />
          Bei der{" "}
          <Link
            href="https://www.katholische-kirche-raum-gelnhausen.de/gelnhausen/05-Gemeindeleben/Kinder-und-Familie/lamakoe.php"
            underline="always"
          >
            Lagerfreizeit der katholischen Kirchengemeinde
          </Link>{" "}
          in der letzten Ferienwoche sind aber noch Plätze frei!
        </Alert>
      );

    default:
      return children ?? null;
  }
}
