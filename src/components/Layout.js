import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from './Footer';
import MainMenu from './MainMenu';
import config from '../api/config';

const useStyles = makeStyles(({ breakpoints, mixins, palette, shadows, shape, spacing, transitions }) => ({
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.up('lg')]: {
      padding: `${spacing(4)}px 0`,
      alignItems: 'center',
    },
  },
  page: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.up('lg')]: {
      width: breakpoints.values.lg - spacing(4),
      boxShadow: shadows[4],
      backgroundColor: palette.background.paper,
      borderRadius: shape.borderRadius,
    },
  },
  mainMenuWithHero: {
    background: 'rgba(255, 255, 255, .75)',
    boxShadow: 'none',
    transition: `background ${transitions.duration.short}ms ${transitions.easing.sharp}`,
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.5)',
    },
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  content: {
    flexGrow: 1,
    position: 'relative',
    ...mixins.gutters(),
    paddingTop: spacing(3),
    paddingBottom: spacing(3),
  },
}));

export default function Layout({ title, back, heroImage, hero, children }) {
  const classes = useStyles();

  return (
    <>
      <Helmet title={title ? `${title} - ${config.title} - Ferienspiele Rothenbergen` : `${config.title} - Ferienspiele Rothenbergen`} />
      <div className={classes.wrapper}>
        <div className={classes.page}>
          <div className={classes.hero} style={{ backgroundImage: heroImage ? `url(${heroImage})` : undefined }}>
            <MainMenu title={title} back={back} className={heroImage ? classes.mainMenuWithHero : undefined} />
            {hero}
          </div>
          <main className={classes.content}>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
}
