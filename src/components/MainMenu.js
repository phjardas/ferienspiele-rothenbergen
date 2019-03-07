import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { useAuth } from '../api/auth';
import ButtonLink from './ButtonLink';

function AuthenticatedMenu(props) {
  return <div {...props}>'authenticated'</div>;
}

function UnauthenticatedMenu(props) {
  return (
    <ButtonLink to="/signin" color="inherit" {...props}>
      anmelden
    </ButtonLink>
  );
}

function MainMenu({ classes }) {
  const { user } = useAuth();
  const Menu = user ? AuthenticatedMenu : UnauthenticatedMenu;

  return (
    <AppBar position="static">
      <Toolbar>
        <ButtonLink component={Typography} to="/" variant="h6" color="inherit" className={classes.title}>
          Ferienspiele Rothenbergen
        </ButtonLink>
        <Menu className={classes.menu} />
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
