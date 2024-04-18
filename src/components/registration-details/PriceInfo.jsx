import { Alert, Card, CardContent, Typography } from "@mui/material";
import QR from "qrcode.react";
import React from "react";
import H3 from "../H3";
import Stack from "../Stack";
import PriceTable from "../registration/PriceTable";

export default function PriceInfo({ child, price }) {
  return (
    <Card>
      <CardContent>
        <H3>Teilnahmebeitrag</H3>
        <Stack>
          <Alert severity="error">
            Sie haben den Teilnahmebeitrag noch nicht bezahlt.
          </Alert>
          <PriceTable price={price} />
          <Typography paragraph>
            Bitte überweisen Sie den Betrag auf das folgende Konto:
          </Typography>
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
          <Typography paragraph>
            Sie können den Teilnahmebeitrag auch in bar bezahlen:
          </Typography>
          <Typography>
            Büro der Evangelischen Kirche
            <br />
            Paul-Gerhardt Str. 2
            <br />
            63584 Gründau-Lieblos
          </Typography>
        </Stack>
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
