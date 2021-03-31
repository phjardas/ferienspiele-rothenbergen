import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { Cake as CakeIcon, ChildCare as ChildIcon, LocalHospital as HospitalIcon, Person as PersonIcon } from '@material-ui/icons';
import React from 'react';
import Age from '../../Age';
import Date from '../../Date';
import GenderIcon from '../../GenderIcon';
import ShirtSize from '../../ShirtSize';
import KuchenInfo from './KuchenInfo';

export default function ChildInfo({ registration }) {
  return (
    <>
      <Grid item xs={12}>
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
            <Typography paragraph>
              T-Shirt: <ShirtSize shirtSize={registration.child.shirtSize} />
            </Typography>
            <Typography paragraph>Vegetarisch: {registration.child.vegetarian ? 'ja' : 'nein'}</Typography>
            {registration.child.miscellaneous && <Typography paragraph>Besonderheiten: {registration.child.miscellaneous}</Typography>}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader avatar={<PersonIcon />} title="Eltern" />
          <CardContent>
            <Typography paragraph>
              Telefon: <a href={`tel:${registration.parent.phone}`}>{registration.parent.phone}</a>
            </Typography>
            <Typography paragraph>
              E-Mail: <a href={`mailto:${registration.parent.email}`}>{registration.parent.email}</a>
            </Typography>
            <Typography paragraph>
              {registration.parent.street}
              <br />
              {registration.parent.plz} {registration.parent.city}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader avatar={<HospitalIcon />} title="Notfallkontakt" />
          <CardContent>
            <Typography paragraph>
              {registration.emergencyContact.name}:{' '}
              <a href={`tel:${registration.emergencyContact.phone}`}>{registration.emergencyContact.phone}</a>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader avatar={<CakeIcon />} title="Optionen" />
          <CardContent>
            <KuchenInfo kuchen={registration.kuchen} />
          </CardContent>
          {/* <CardContent>
            <UebernachtungInfo uebernachtung={registration.uebernachtung} />
          </CardContent> */}
        </Card>
      </Grid>{' '}
    </>
  );
}
