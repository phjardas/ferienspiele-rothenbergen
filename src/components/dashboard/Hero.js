import { Typography, withStyles } from '@material-ui/core';
import React from 'react';
import config from '../../api/config';
import Date from '../Date';
import H2 from '../H2';
import RegistrationStatus from './RegistrationStatus';

const { app, title, startDate, endDate } = config;

function Hero({ classes }) {
  return (
    <div className={classes.content}>
      <H2 variant="h2" className={classes.heading}>
        {title}
      </H2>
      <Typography variant="h5" paragraph>
        {app}
      </Typography>
      <Typography variant="body1" paragraph>
        Von <Date value={startDate} /> bis <Date value={endDate} />
      </Typography>
      <RegistrationStatus />
    </div>
  );
}

const styles = ({ breakpoints, mixins, spacing }) => ({
  heading: {
    [breakpoints.up('lg')]: {
      marginTop: spacing(30),
    },
  },
  content: {
    ...mixins.gutters(),
    paddingTop: spacing(3),
    paddingBottom: spacing(3),
    background: 'rgba(255, 255, 255, .75)',
  },
});

export default withStyles(styles)(Hero);
