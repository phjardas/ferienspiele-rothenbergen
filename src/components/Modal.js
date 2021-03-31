import { Dialog, DialogContent, DialogTitle, IconButton, withMobileDialog } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import React, { Suspense } from 'react';
import GlobalLoader from './GlobalLoader';

function Modal({ title, fullScreen, open, onClose, children }) {
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

export default withMobileDialog()(Modal);
