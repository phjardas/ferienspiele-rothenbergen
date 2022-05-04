import { Dialog, DialogContent, DialogTitle, IconButton, useMediaQuery } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import React, { Suspense } from 'react';
import GlobalLoader from './GlobalLoader';

export default function Modal({ title, open, onClose, children }) {
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

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
      <DialogContent>{open && <Suspense fallback={<GlobalLoader />}>{children}</Suspense>}</DialogContent>
    </Dialog>
  );
}
