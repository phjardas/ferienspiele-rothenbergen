import { Close as CloseIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import React, { Suspense } from "react";
import GlobalLoader from "./GlobalLoader";

export default function Modal({ title, open, onClose, children }) {
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
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
    </Dialog>
  );
}
