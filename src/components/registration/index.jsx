import { Alert, LinearProgress, Link } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import config from "../../api/config";
import {
  storeRegistration,
  useInvitation,
  useRegistrationStatus,
} from "../../api/firestore";
import FormattedDate from "../Date";
import Registration from "./Registration";

const { registrationStart } = config;

export default function RegistrationWrapper({ code, ...props }) {
  const [submitting, setSubmitting] = useState(false);
  const status = useAnmeldungStatus({ code });

  const navigate = useNavigate();
  const onSubmit = useCallback(
    async (data) => {
      try {
        setSubmitting(true);
        const result = await storeRegistration(data, code);
        navigate(`/anmeldung/${result.id}`);
      } finally {
        setSubmitting(false);
      }
    },
    [navigate, code],
  );

  if (submitting || status.status === "open") {
    return <Registration {...props} onSubmit={onSubmit} />;
  }

  try {
    switch (status.status) {
      case "loading":
        return <LinearProgress />;
      case "before-registration":
        return (
          <Alert severity="error">
            Die Anmeldung ist geöffnet ab{" "}
            <FormattedDate
              value={status.registrationStart}
              dateStyle="full"
              timeStyle="short"
            />
          </Alert>
        );

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

      case "invitation-not-found":
        return <Alert severity="error">Einladung nicht gefunden.</Alert>;

      case "invitation-redeemed":
        return (
          <Alert severity="error">
            Diese Einladung wurde bereits eingelöst.
          </Alert>
        );

      case "error":
        throw status.error;

      default:
        throw new Error(`Unbekannter Status: ${JSON.stringify(status)}`);
    }
  } catch (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }
}

function useAnmeldungStatus({ code }) {
  const registrationStatus = useRegistrationStatus();
  const invitation = useInvitation(code);

  return useMemo(() => {
    if (registrationStatus.loading || invitation.loading) {
      return { status: "loading" };
    }

    if (registrationStatus.error || invitation.error) {
      return {
        status: "error",
        error: registrationStatus.error || invitation.error,
      };
    }

    if (code) {
      if (!invitation.data) {
        return { status: "invitation-not-found" };
      }

      if (invitation.data.redeemedAt) {
        return { status: "invitation-redeemed" };
      }

      return { status: "open" };
    }

    if (Date.now() < registrationStart.getTime()) {
      return { status: "before-registration", registrationStart };
    }

    return { status: registrationStatus.data.registrationStatus };
  }, [code, registrationStatus, invitation]);
}
