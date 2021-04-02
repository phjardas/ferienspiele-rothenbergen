import { Avatar, Button, Card, CardActions, CardHeader, IconButton, Popper, withStyles } from '@material-ui/core';
import { AccountCircle as UserIcon } from '@material-ui/icons';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../api/auth';
import ButtonLink from './ButtonLink';

function AuthenticatedMenu({ classes, ...props }) {
  const history = useHistory();
  const { signOut, user } = useAuth();
  const [anchor, setAnchor] = useState();

  const toggle = useCallback((e) => setAnchor((a) => (a ? undefined : e.currentTarget)), []);

  const doSignOut = useCallback(() => {
    toggle();
    signOut();
    history.push('/');
  }, [toggle, signOut, history]);

  return (
    <div {...props}>
      {user.hasAnyRole('office', 'kuchen') && (
        <ButtonLink to="/office" color="inherit">
          Verwaltung
        </ButtonLink>
      )}
      <IconButton color="inherit" aria-owns="user-menu" aria-haspopup="true" onClick={toggle}>
        {user.photoURL ? <Avatar src={user.photoURL} /> : <UserIcon />}
      </IconButton>
      <Popper
        id="user-menu"
        anchorEl={anchor}
        placement="bottom-end"
        transition
        disablePortal
        open={!!anchor}
        onClose={toggle}
        className={classes.popper}
      >
        <span className={classes.arrow} />
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
      </Popper>
    </div>
  );
}

const styles = ({ zIndex }) => ({
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
});

export default withStyles(styles)(AuthenticatedMenu);
