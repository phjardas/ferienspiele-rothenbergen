import { AppBar, IconButton, Toolbar, Typography, withStyles } from '@material-ui/core';
import { ArrowBack as BackIcon } from '@material-ui/icons';
import React from 'react';
import { useAuth } from '../api/auth';
import { usePage } from '../api/page';
import AuthenticatedMenu from './AuthenticatedMenu';
import ButtonLink from './ButtonLink';
import UnauthenticatedMenu from './UnauthenticatedMenu';

function MainMenu({ classes }) {
  const { title, back } = usePage();
  const { pending, user } = useAuth();
  const Menu = user ? AuthenticatedMenu : UnauthenticatedMenu;

  return (
    <AppBar position="static">
      <Toolbar>
        {back && (
          <ButtonLink {...back} component={IconButton} color="inherit" className={classes.backButton}>
            <BackIcon />
          </ButtonLink>
        )}
        <ButtonLink component={Typography} to="/" variant="h6" color="inherit" className={classes.title}>
          {title}
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
  backButton: {
    marginLeft: -12,
  },
  menu: {
    marginLeft: 'auto',
  },
};

export default withStyles(styles)(MainMenu);
