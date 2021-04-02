import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { ArrowBack as BackIcon } from '@material-ui/icons';
import React from 'react';
import { useAuth } from '../api/auth';
import AuthenticatedMenu from './AuthenticatedMenu';
import ButtonLink from './ButtonLink';
import UnauthenticatedMenu from './UnauthenticatedMenu';

const useStyles = makeStyles(() => ({
  menu: {
    marginLeft: 'auto',
  },
}));

export default function MainMenu({ title, back, className }) {
  const classes = useStyles();
  const { pending, user } = useAuth();
  const Menu = user ? AuthenticatedMenu : UnauthenticatedMenu;

  return (
    <AppBar position="static" className={className}>
      <Toolbar>
        {back && (
          <ButtonLink {...back} component={IconButton} color="inherit" edge="start">
            <BackIcon />
          </ButtonLink>
        )}
        <Typography variant="h6" color="inherit" className={classes.title}>
          {title || 'Ferienspiele Rothenbergen'}
        </Typography>
        {!pending && <Menu className={classes.menu} />}
      </Toolbar>
    </AppBar>
  );
}
