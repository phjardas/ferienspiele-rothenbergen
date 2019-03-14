import { withStyles } from '@material-ui/core';
import React from 'react';
import Footer from './Footer';
import MainMenu from './MainMenu';

function Layout({ heroImage, hero, children, classes }) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.page}>
        <div className={classes.hero} style={{ backgroundImage: `url(${heroImage})` }}>
          <MainMenu className={heroImage ? classes.mainMenuWithHero : undefined} />
          {hero}
        </div>
        <main className={classes.content}>{children}</main>
      </div>
      <Footer />
    </div>
  );
}

const styles = ({ breakpoints, mixins, palette, shadows, shape, spacing, transitions }) => ({
  wrapper: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.up('lg')]: {
      padding: `${spacing.unit * 4}px 0`,
      alignItems: 'center',
    },
  },
  page: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.up('lg')]: {
      width: breakpoints.values.lg - spacing.unit * 4,
      boxShadow: shadows[4],
      backgroundColor: palette.background.paper,
      borderRadius: shape.borderRadius,
    },
  },
  mainMenuWithHero: {
    background: 'transparent',
    boxShadow: 'none',
    transition: `background ${transitions.duration.short}ms ${transitions.easing.sharp}`,
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.2)',
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
    paddingTop: spacing.unit * 3,
    paddingBottom: spacing.unit * 3,
  },
});

export default withStyles(styles)(Layout);
