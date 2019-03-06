import { withStyles } from '@material-ui/core';
import React from 'react';
import Footer from './Footer';
import MainMenu from './MainMenu';

function Layout({ children, classes }) {
  return (
    <>
      <MainMenu />
      <main className={classes.content}>{children}</main>
      <Footer />
    </>
  );
}

const styles = ({ spacing }) => ({
  content: {
    paddingTop: spacing.unit * 8,
  },
});

export default withStyles(styles)(Layout);
