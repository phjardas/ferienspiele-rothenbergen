import { Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ classes }) {
  return (
    <footer className={classes.root}>
      <Typography color="inherit">
        Eine Veranstaltung der{' '}
        <a href="http://www.kirche-aufdemberg.de/kinder-und-jugend/ferienspiele/index.html">Ev. Kirchengemeinde "Auf dem Berg"</a>, der{' '}
        <a href="http://www.emk-rothenbergen.de/Ferienspiele/">Ev.-methodistischen Kirche Rothenbergen</a> und der{' '}
        <a href="http://kath-kirche-mhg.de/">Kath. Kirchengemeinde Christkönig</a> – <Link to="/impressum">Impressum</Link> –{' '}
        <Link to="/datenschutz">Datenschutz</Link>
      </Typography>
    </footer>
  );
}

const styles = ({ breakpoints, palette, spacing }) => ({
  root: {
    padding: `${spacing.unit}px ${spacing.unit * 2}px`,
    color: palette.text.secondary,
    borderTop: `1px solid ${palette.grey[400]}`,
    '& a': {
      color: 'inherit',
    },
    [breakpoints.up('lg')]: {
      padding: 0,
      marginTop: spacing.unit,
      border: 0,
    },
  },
});

export default withStyles(styles)(Footer);
