import { Button, Card, CardContent, CardHeader, Popover } from "@mui/material";
import {
  bindPopover,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import React, { useId } from "react";
import SignInForm from "./auth/SignInForm";

export default function UnauthenticatedMenu() {
  const popupState = usePopupState({ variant: "popover", popupId: useId() });

  return (
    <>
      <Button color="inherit" {...bindTrigger(popupState)}>
        Login
      </Button>
      <Popover
        id="login-menu"
        placement="bottom-end"
        {...bindPopover(popupState)}
        sx={{ zIndex: (theme) => theme.zIndex.modal }}
      >
        <Card>
          <CardHeader title="Anmelden" />
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </Popover>
    </>
  );
}
