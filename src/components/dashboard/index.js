import { Typography } from '@material-ui/core';
import React from 'react';
import config from '../../api/config';
import Date from '../Date';
import H2 from '../H2';
import Infos from './Infos';
import RegistrationStatus from './RegistrationStatus';

export default function Dashboard() {
  const { title, startDate, endDate } = config;

  return (
    <>
      <H2>{title}</H2>
      <Typography paragraph>Ökumenische Ferienspiele in Rothenbergen</Typography>
      <Typography paragraph>
        Von <Date value={startDate} /> bis <Date value={endDate} />
      </Typography>
      <RegistrationStatus />
      <Infos />
    </>
  );
}
