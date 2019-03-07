import { Grid, withStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const version = {
  // FIXME
  revision: 'dev',
};

function Footer({ classes }) {
  return (
    <footer className={classes.root}>
      <Grid container spacing={16} direction="row" wrap="nowrap" justify="space-between">
        <Grid item>
          <Typography color="inherit">
            Eine Veranstaltung der{' '}
            <a href="http://www.kirche-aufdemberg.de/kinder-und-jugend/ferienspiele/index.html">Ev. Kirchengemeinde "Auf dem Berg"</a>, der{' '}
            <a href="http://www.emk-rothenbergen.de/Ferienspiele/">Ev.-methodistischen Kirche Rothenbergen</a> und der{' '}
            <a href="http://kath-kirche-mhg.de/">Kath. Kirchengemeinde Christkönig</a> – <Link to="/impressum">Impressum</Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="inherit">Version {version.revision}</Typography>
        </Grid>
      </Grid>
    </footer>
  );
}

const styles = ({ mixins, palette, spacing }) => ({
  root: {
    backgroundColor: palette.grey[800],
    color: palette.getContrastText(palette.grey[800]),
    ...mixins.gutters(),
    paddingTop: spacing.unit * 2,
    paddingBottom: spacing.unit * 2,
    '& a': {
      color: 'inherit',
    },
  },
});

export default withStyles(styles)(Footer);
