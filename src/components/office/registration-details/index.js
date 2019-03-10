import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { ChildCare as ChildIcon } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { usePage } from '../../../api/page';
import Age from '../../Age';
import Date from '../../Date';
import GenderIcon from '../../GenderIcon';

export default function RegistrationDetails({ registration }) {
  const { setPage } = usePage();
  useEffect(
    () =>
      setPage({
        title: `${registration.child.firstName} ${registration.child.lastName}`,
        back: { to: '/office/anmeldungen' },
      }),
    [registration]
  );

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader avatar={<ChildIcon />} title={`${registration.child.firstName} ${registration.child.lastName}`} />
          <CardContent>
            <Typography paragraph>
              Geschlecht: <GenderIcon gender={registration.child.gender} label />
            </Typography>
            <Typography paragraph>
              Geburtstag: <Date value={registration.child.dateOfBirth} />
            </Typography>
            <Typography paragraph>
              Alter: <Age dateOfBirth={registration.child.dateOfBirth} /> Jahre bei Beginn der Ferienspiele
            </Typography>
            <Typography paragraph>T-Shirt: {registration.child.shirtSize}</Typography>
            <Typography paragraph>Vegetarisch: {registration.child.vegetarian ? 'ja' : 'nein'}</Typography>
            {registration.child.miscellaneous && <Typography paragraph>Besonderheiten: {registration.child.miscellaneous}</Typography>}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
