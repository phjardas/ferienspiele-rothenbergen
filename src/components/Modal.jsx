import { Close as CloseIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import React, { Suspense } from "react";
import GlobalLoader from "./GlobalLoader";

export default function Modal({
  title,
  open,
  onClose,
  children,
  actions,
  ...props
}) {
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose} {...props}>
      <DialogTitle>
        <>
          <IconButton color="inherit" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
          {title}
        </>
      </DialogTitle>
      <DialogContent>
        {open && <Suspense fallback={<GlobalLoader />}>{children}</Suspense>}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}
