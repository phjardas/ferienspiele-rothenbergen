import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import config from '../api/config';
import Footer from './Footer';
import MainMenu from './MainMenu';

const useStyles = makeStyles(({ breakpoints, palette, spacing }) => ({
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: palette.primary[100],
    paddingBottom: spacing(2),
    [breakpoints.up('lg')]: {
      alignItems: 'center',
    },
  },
  page: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: `0 ${spacing(4)}px`,
    [breakpoints.up('lg')]: {
      width: breakpoints.values.lg - spacing(4),
    },
  },
  content: {
    flexGrow: 1,
    position: 'relative',
    paddingTop: spacing(3),
    paddingBottom: spacing(3),
  },
}));

export default function Layout({ title, back, hideMenu, children }) {
  const classes = useStyles();

  return (
    <>
      <Helmet title={title ? `${title} - ${config.title} - ${config.app}` : `${config.title} - ${config.app}`} />
      <div className={classes.wrapper}>
        {hideMenu ? null : <MainMenu title={title} back={back} />}
        <div className={classes.page}>
          <main className={classes.content}>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
}
