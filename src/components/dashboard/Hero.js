import { Typography, withStyles } from '@material-ui/core';
import React from 'react';
import config from '../../api/config';
import Date from '../Date';
import Card from '../Card';
import H2 from '../H2';
import RegistrationStatus from './RegistrationStatus';
import titleImage from './title.jpg';
import CardContent from '../CardContent';

const { app, title, startDate, endDate } = config;

function Hero({ classes }) {
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
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
      </CardContent>
    </Card>
  );
}

const styles = ({ breakpoints, spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundImage: `url(${titleImage})`,
  },
  heading: {
    [breakpoints.up('lg')]: {
      marginTop: spacing(30),
    },
  },
  content: {
    background: 'rgba(255, 255, 255, .75)',
  },
});

export default withStyles(styles)(Hero);
