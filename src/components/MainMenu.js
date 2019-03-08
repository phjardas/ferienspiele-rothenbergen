import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { useAuth } from '../api/auth';
import AuthenticatedMenu from './AuthenticatedMenu';
import ButtonLink from './ButtonLink';
import UnauthenticatedMenu from './UnauthenticatedMenu';

function MainMenu({ classes }) {
  const { pending, user } = useAuth();
  const Menu = user ? AuthenticatedMenu : UnauthenticatedMenu;

  return (
    <AppBar position="static">
      <Toolbar>
        <ButtonLink component={Typography} to="/" variant="h6" color="inherit" className={classes.title}>
          Ferienspiele Rothenbergen
        </ButtonLink>
        {!pending && <Menu className={classes.menu} />}
      </Toolbar>
    </AppBar>
  );
}

const styles = {
  title: {
    textDecoration: 'none',
  },
  menu: {
    marginLeft: 'auto',
  },
};

export default withStyles(styles)(MainMenu);
