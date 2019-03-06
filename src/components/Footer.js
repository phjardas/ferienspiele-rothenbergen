import { Grid, withStyles } from '@material-ui/core';
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
          Eine Veranstaltung der{' '}
          <a href="http://www.kirche-aufdemberg.de/kinder-und-jugend/ferienspiele/index.html">Ev. Kirchengemeinde "Auf dem Berg"</a>, der{' '}
          <a href="http://www.emk-rothenbergen.de/Ferienspiele/">Ev.-methodistischen Kirche Rothenbergen</a> und der{' '}
          <a href="http://kath-kirche-mhg.de/">Kath. Kirchengemeinde Christkönig</a> – <Link to="/impressum">Impressum</Link>
        </Grid>
        <Grid item>Version {version.revision}</Grid>
      </Grid>
    </footer>
  );
}

const styles = ({ palette, spacing, typography }) => ({
  root: {
    backgroundColor: palette.grey[200],
    ...typography.body2,
    padding: spacing.unit,
  },
});

export default withStyles(styles)(Footer);
