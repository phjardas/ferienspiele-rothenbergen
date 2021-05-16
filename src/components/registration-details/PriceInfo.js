import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { EuroSymbol as EuroIcon } from '@material-ui/icons';
import React from 'react';
import Alert from '../Alert';
import PriceTable from '../registration/PriceTable';
import QR from 'qrcode.react';

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
          IBAN: DE38 5075 0094 0027 0509 92 <br />
          BIC: HELADEF1GEL <br />
          Verwendungszweck: "Ferienspiele {child.firstName} {child.lastName}"
        </Typography>

        <Typography variant="h6" paragraph>
          Überweisung mit Giropay
        </Typography>
        <Typography paragraph>
          <EPC child={child} price={price} />
        </Typography>

        <Typography variant="h6" paragraph>
          Barzahlung
        </Typography>
        <Typography paragraph>Sie können den Teilnahmebeitrag auch in bar bezahlen:</Typography>
        <Typography>
          Büro der Evangelischen Kirche
          <br />
          Paul-Gerhardt Str. 2
          <br />
          63584 Gründau-Lieblos
        </Typography>
      </CardContent>
    </Card>
  );
}

function EPC({ child, price }) {
  const data = `
BCD
002
1
SCT

EmK Rothenbergen
DE38507500940027050992
EUR${price.total}


Ferienspiele ${child.firstName.trim()} ${child.lastName.trim()}
`.trim();

  return <QR value={data} size={256} />;
}
