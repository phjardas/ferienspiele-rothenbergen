import { Link, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function Footer({ classes }) {
  return (
    <Typography component="footer" variant="caption" className={classes.root}>
      Eine Veranstaltung der{' '}
      <Link href="http://www.kirche-aufdemberg.de/kinder-und-jugend/ferienspiele/index.html">Ev. Kirchengemeinde "Auf dem Berg"</Link>, der{' '}
      <Link href="http://www.emk-rothenbergen.de/Ferienspiele/">Ev.-methodistischen Kirche Rothenbergen</Link> und der{' '}
      <Link href="http://kath-kirche-mhg.de/">Kath. Kirchengemeinde Christkönig</Link> –{' '}
      <Link component={RouterLink} to="/impressum">
        Impressum
      </Link>{' '}
      –{' '}
      <Link component={RouterLink} to="/datenschutz">
        Datenschutz
      </Link>
    </Typography>
  );
}

const styles = ({ breakpoints, palette, spacing }) => ({
  root: {
    padding: `${spacing(1)}px ${spacing(2)}px`,
    borderTop: `1px solid ${palette.grey[400]}`,
    '& a': {
      color: 'inherit',
    },
    [breakpoints.up('lg')]: {
      padding: 0,
      marginTop: spacing(1),
      border: 0,
    },
  },
});

export default withStyles(styles)(Footer);
