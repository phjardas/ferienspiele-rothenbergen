import { Grid, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import config from '../../api/config';
import Date from '../Date';
import H2 from '../H2';
import RegistrationStatus from './RegistrationStatus';

const { title, startDate, endDate } = config;

function Hero({ classes }) {
  return (
    <Grid container>
      <Grid item xs={12} lg={6} className={classes.content}>
        <H2 variant="h2" className={classes.heading}>
          {title}
        </H2>
        <Typography variant="h5" paragraph>
          Ökumenische Ferienspiele in Rothenbergen
        </Typography>
        <Typography variant="body1" paragraph>
          Von <Date value={startDate} /> bis <Date value={endDate} />
        </Typography>
        <RegistrationStatus />
      </Grid>
    </Grid>
  );
}

const styles = ({ breakpoints, mixins, spacing }) => ({
  heading: {
    [breakpoints.up('lg')]: {
      marginTop: spacing.unit * 30,
    },
  },
  content: {
    ...mixins.gutters(),
    paddingTop: spacing.unit * 3,
    paddingBottom: spacing.unit * 3,
  },
});

export default withStyles(styles)(Hero);
