import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from './Footer';
import MainMenu from './MainMenu';
import config from '../api/config';
import background from './background.jpg';

const useStyles = makeStyles(({ breakpoints, mixins, palette, shadows, shape, spacing, transitions }) => ({
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.up('lg')]: {
      padding: `${spacing(4)}px 0`,
      alignItems: 'center',
      backgroundImage: `url(${background})`,
    },
  },
  page: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: palette.background.paper,
    [breakpoints.up('lg')]: {
      width: breakpoints.values.lg - spacing(4),
      boxShadow: shadows[4],
      borderRadius: shape.borderRadius,
    },
  },
  mainMenuWithHero: {
    background: 'rgba(255, 255, 255, .75)',
    color: 'rgba(255, 255, 255, 0)',
    boxShadow: 'none',
    transition: ['background', 'color', 'box-shadow']
      .map((p) => `${p} ${transitions.duration.standard}ms ${transitions.easing.sharp}`)
      .join(', '),
    '&:hover': {
      background: 'rgba(0, 63, 140, 1)',
      color: 'rgba(255, 255, 255, 1)',
      boxShadow: shadows[4],
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
