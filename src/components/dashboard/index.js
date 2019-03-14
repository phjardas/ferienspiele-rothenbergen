import { Grid, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import config from '../../api/config';
import Date from '../Date';
import Footer from '../Footer';
import H2 from '../H2';
import MainMenu from '../MainMenu';
import Infos from './Infos';
import RegistrationStatus from './RegistrationStatus';
import titleImage from './title.jpg';

function Dashboard({ classes }) {
  const { title, startDate, endDate } = config;

  return (
    <div className={classes.wrapper}>
      <div className={classes.page}>
        <div className={classes.hero}>
          <MainMenu className={classes.mainMenu} />
          <Grid container>
            <Grid item xs={12} lg={5} className={classes.content}>
              <H2>{title}</H2>
              <Typography variant="body1" paragraph>
                Ökumenische Ferienspiele in Rothenbergen
              </Typography>
              <Typography variant="body1" paragraph>
                Von <Date value={startDate} /> bis <Date value={endDate} />
              </Typography>
              <RegistrationStatus />
            </Grid>
          </Grid>
        </div>
        <div className={classes.content}>
          <Infos />
        </div>
      </div>
      <Footer />
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
  hero: {
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `url(${titleImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  mainMenu: {
    background: 'transparent',
    boxShadow: 'none',
  },
  content: {
    ...mixins.gutters(),
    paddingTop: spacing.unit * 3,
    paddingBottom: spacing.unit * 3,
  },
});

export default withStyles(styles)(Dashboard);
