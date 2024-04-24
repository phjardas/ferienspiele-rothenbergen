import { Add, Check, CheckBoxOutlineBlank, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import useId from "@mui/material/utils/useId";
import {
  bindDialog,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import React, { useCallback, useState } from "react";
import {
  useCreateInvitation,
  useDeleteInvitation,
  useInvitations,
} from "../../api/firestore";
import GlobalLoader from "../GlobalLoader";
import LinkBehavior from "../LinkBehavior";
import Modal from "../Modal";
import Stack from "../Stack";

export default function Anmeldungen() {
  const { loading, error, data } = useInvitations();

  if (loading) return <GlobalLoader noLayout />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Card>
      <CardContent>
        <Typography paragraph>
          Mit einer Einladung kann ein einziges Kind unabhängig vom
          Registrierungszeitraum oder der maximalen Teilnehmeranzahl registriert
          werden.
        </Typography>
        <AddInvitationButton />
      </CardContent>
      <List>
        {data.map((invitation) =>
          invitation.registrationId ? (
            <RedeemedInvitation key={invitation.id} invitation={invitation} />
          ) : (
            <OpenInvitation key={invitation.id} invitation={invitation} />
          ),
        )}
      </List>
    </Card>
  );
}

function AddInvitationButton() {
  const popupState = usePopupState({ variant: "popover", popupId: useId() });

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        {...bindTrigger(popupState)}
      >
        Einladung erstellen
      </Button>
      {popupState.isOpen && (
        <Modal
          maxWidth="xs"
          fullWidth
          title="Einladung"
          actions={
            <Button
              type="text"
              color="inherit"
              onClick={() => popupState.close()}
            >
              Schließen
            </Button>
          }
          {...bindDialog(popupState)}
        >
          <Box sx={{ pt: 1 }}>
            <CreateInvitation />
          </Box>
        </Modal>
      )}
    </>
  );
}

function CreateInvitation() {
  const [note, setNote] = useState("");
  const [{ submitting, error, invitation }, setState] = useState({});
  const createInvitation = useCreateInvitation();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setState({ submitting: true });

      try {
        const invitation = await createInvitation({ note });
        setState({ invitation });
      } catch (error) {
        setState({ error });
      }
    },
    [note, createInvitation],
  );

  if (invitation) {
    return (
      <Stack>
        <Alert severity="success">
          Einladung "{invitation.note}" erstellt.
        </Alert>
        <Typography>
          Verschicke den folgenden Link, mit dem man genau ein Kind anmelden
          kann.
        </Typography>
        <Typography>
          <CopyInvitationLink invitation={invitation} />
        </Typography>
      </Stack>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextField
          name="note"
          label="Notiz"
          fullWidth
          required
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={submitting}
        />
        {error && <Alert severity="error">{error.message}</Alert>}
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={submitting}
          disabled={!note.trim().length}
        >
          Einladung erstellen
        </LoadingButton>
      </Stack>
    </form>
  );
}

function OpenInvitation({ invitation }) {
  return (
    <ListItem>
      <ListItemIcon>
        <CheckBoxOutlineBlank />
      </ListItemIcon>
      <ListItemText
        primary={invitation.note}
        secondary={<CopyInvitationLink invitation={invitation} />}
      />
      <ListItemSecondaryAction>
        <DeleteInvitationButton invitation={invitation} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

function DeleteInvitationButton({ invitation }) {
  const [loading, setLoading] = useState(false);
  const deleteInvitation = useDeleteInvitation();

  const onClick = useCallback(async () => {
    setLoading(true);
    await deleteInvitation(invitation.id);
  }, [invitation, deleteInvitation]);

  return (
    <IconButton onClick={onClick} disabled={loading}>
      {loading ? <CircularProgress size="1em" color="inherit" /> : <Delete />}
    </IconButton>
  );
}

function RedeemedInvitation({ invitation }) {
  return (
    <ListItemButton
      component={LinkBehavior}
      href={`/office/anmeldungen/${invitation.registrationId}`}
    >
      <ListItemIcon>
        <Check />
      </ListItemIcon>
      <ListItemText
        primary={invitation.note}
        secondary={
          <>
            eingelöst am{" "}
            {new Date(invitation.redeemedAt.seconds * 1000).toLocaleString(
              undefined,
              { dateStyle: "long", timeStyle: "short" },
            )}
          </>
        }
      />
    </ListItemButton>
  );
}

function CopyInvitationLink({ invitation }) {
  const url = `${location.origin}/anmeldung?code=${encodeURIComponent(invitation.id)}`;
  const [done, setDone] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(url).then(() => {
      setDone(true);
      setTimeout(() => setDone(false), 5000);
    });
  }, [url]);

  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        copy();
      }}
    >
      Link zur Einladung kopieren
      {done && <Check fontSize="1em" color="success" sx={{ ml: 0.5 }} />}
    </Link>
  );
}
