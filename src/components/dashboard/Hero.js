import { Box, Typography } from '@material-ui/core';
import React from 'react';
import config from '../../api/config';
import Card from '../Card';
import CardContent from '../CardContent';
import Date from '../Date';
import H2 from '../H2';
import RegistrationStatus from './RegistrationStatus';

const { app, title, startDate, endDate } = config;

export default function Hero() {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', textAlign: 'center' }}>
          <Box component="img" src="/logo-256.png" width="256" height="256" alt="Logo der Ferienspiele" sx={{ maxWidth: '100%' }} />
          <H2 variant="h2">{title}</H2>
          <Typography variant="h5">{app}</Typography>
          <Typography variant="body1">
            Von <Date value={startDate} /> bis <Date value={endDate} />
          </Typography>
          <RegistrationStatus />
        </Box>
      </CardContent>
    </Card>
  );
}
