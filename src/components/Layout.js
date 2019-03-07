import { withStyles } from '@material-ui/core';
import React from 'react';
import Footer from './Footer';
import MainMenu from './MainMenu';

function Layout({ children, classes }) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.page}>
        <MainMenu />
        <main className={classes.content}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}

const styles = ({ breakpoints, mixins, palette, shadows, shape, spacing }) => ({
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
  content: {
    flexGrow: 1,
    position: 'relative',
    ...mixins.gutters(),
    paddingTop: spacing.unit * 3,
    paddingBottom: spacing.unit * 3,
  },
});

export default withStyles(styles)(Layout);
