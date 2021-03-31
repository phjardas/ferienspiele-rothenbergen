import { Button, Paper, Popper, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import SignInForm from './auth/SignInForm';

function UnauthenticatedMenu({ classes, ...props }) {
  const [anchor, setAnchor] = useState();

  const toggle = e => setAnchor(a => (a ? undefined : e.currentTarget));

  return (
    <>
      <Button color="inherit" aria-owns="login-menu" aria-haspopup="true" onClick={toggle} {...props}>
        Login
      </Button>
      <Popper
        id="login-menu"
        anchorEl={anchor}
        placement="bottom-end"
        transition
        disablePortal
        open={!!anchor}
        onClose={toggle}
        className={classes.popper}
      >
        <span className={classes.arrow} />
        <Paper className={classes.paper}>
          <SignInForm />
        </Paper>
      </Popper>
    </>
  );
}

const styles = ({ spacing, zIndex }) => ({
  popper: {
    zIndex: zIndex.modal,
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    top: -7,
    right: 13,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '0 1em 1em 1em',
      borderColor: 'transparent transparent #fff transparent',
    },
  },
  paper: {
    padding: spacing(3),
  },
});

export default withStyles(styles)(UnauthenticatedMenu);
