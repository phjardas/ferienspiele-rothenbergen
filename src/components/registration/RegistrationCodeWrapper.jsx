import { Alert, LinearProgress } from "@mui/material";
import { useInvitation } from "../../api/firestore";

export default function RegistrationCodeWrapper({ code, fallback, children }) {
  if (!code) return fallback;
  return <InvitationWrapper code={code}>{children}</InvitationWrapper>;
}

function InvitationWrapper({ code, children }) {
  const invitation = useInvitation(code);

  if (invitation.loading) return <LinearProgress />;

  if (invitation.error) {
    return (
      <Alert severity="error">
        Einladung konnte nicht geladen werden: {invitation.error.message}
      </Alert>
    );
  }

  if (!invitation.data) {
    return <Alert severity="error">Einladung nicht gefunden.</Alert>;
  }

  if (invitation.data.redeemedAt) {
    return (
      <Alert severity="error">Diese Einladung wurde bereits eingelöst.</Alert>
    );
  }

  return children;
}
