import { AccountCircle as UserIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  IconButton,
  Popover,
} from "@mui/material";
import useId from "@mui/material/utils/useId";
import {
  bindPopover,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../api/auth";
import LinkBehavior from "./LinkBehavior";

export default function AuthenticatedMenu(props) {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const popupState = usePopupState({ variant: "popover", popupId: useId() });

  const doSignOut = useCallback(() => {
    popupState.close();
    signOut();
    navigate("/");
  }, [popupState, signOut, navigate]);

  return (
    <div {...props}>
      {user.hasAnyRole("office", "kuchen") && (
        <Button component={LinkBehavior} href="/office" color="inherit">
          Verwaltung
        </Button>
      )}
      <IconButton color="inherit" {...bindTrigger(popupState)}>
        {user.photoURL ? <Avatar src={user.photoURL} /> : <UserIcon />}
      </IconButton>
      <Popover
        id="user-menu"
        placement="bottom-end"
        sx={{ zIndex: (theme) => theme.zIndex.modal }}
        {...bindPopover(popupState)}
      >
        <Card>
          <CardHeader
            avatar={user.photoURL && <Avatar src={user.photoURL} />}
            title={user.displayName || user.email}
            subheader={user.displayName && user.email}
          />
          <CardActions>
            <Button onClick={doSignOut}>Abmelden</Button>
          </CardActions>
        </Card>
      </Popover>
    </div>
  );
}
