import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { EuroSymbol as EuroIcon } from '@material-ui/icons';
import React from 'react';
import Alert from '../Alert';
import PriceTable from '../registration/PriceTable';

export default function PriceInfo({ child, price }) {
  return (
    <Card>
      <CardHeader avatar={<EuroIcon />} title="Teilnahmebeitrag" />
      <CardContent>
        <Alert color="error">Sie haben den Teilnahmebeitrag noch nicht bezahlt.</Alert>
      </CardContent>
      <CardContent>
        <PriceTable price={price} />
      </CardContent>
      <CardContent>
        <Typography paragraph>Bitte überweisen Sie den Betrag auf das folgende Konto:</Typography>
        <Typography paragraph>
          Empfänger: EmK Rothenbergen
          <br />
          IBAN: DE38507500940027050992 <br />
          BIC: HELADEF1GEL <br />
          Verwendungszweck: "Ferienspiele {child.firstName} {child.lastName}"
        </Typography>
        <Typography paragraph>Sie können den Teilnahmebeitrag in bar bezahlen:</Typography>
        <Typography paragraph>
          Büro der Katholischen Kirche "Christkönig"
          <br />
          Niedergründauer Straße 20 <br />
          63584 Rothenbergen
        </Typography>
      </CardContent>
    </Card>
  );
}
