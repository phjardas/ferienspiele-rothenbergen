import { Alert, Card, CardContent, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import config from "../../api/config";
import Date from "../Date";
import H3 from "../H3";
import Stack from "../Stack";
import PriceTable from "../registration/PriceTable";

export default function PriceInfo({ child, price }) {
  return (
    <Card>
      <CardContent>
        <H3>Teilnahmebeitrag</H3>
        <Stack>
          <Alert severity="info" gutterBottom>
            Falls Sie bereits bezahlt haben: Wir melden uns bei Ihnen, wenn bis
            zum <Date value={config.waiverDeadline} /> keine Zahlung eingegangen
            ist. Bis dahin sehen Sie bitte von Rückfragen ab. Vielen Dank!
          </Alert>
          <PriceTable price={price} />
          <Typography gutterBottom>
            Bitte überweisen Sie den Betrag auf das folgende Konto:
          </Typography>
          <Typography gutterBottom>
            Empfänger: {config.bankverbindung.name}
            <br />
            IBAN: {config.bankverbindung.iban}
            <br />
            Verwendungszweck: "Ferienspiele {child.firstName} {child.lastName}"
          </Typography>
          <Typography variant="h6">Überweisung mit App</Typography>
          <Typography>
            <EPC child={child} price={price} />
          </Typography>
          <Typography variant="caption" gutterBottom>
            Scannen Sie einfach diesen QR-Code in Ihrer Banking-App mit der
            Funktion "Foto-Überweisung".
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

${config.bankverbindung.name}
${config.bankverbindung.iban.replace(/\s/g, "")}
EUR${price.total}


Ferienspiele ${child.firstName.trim()} ${child.lastName.trim()}
`.trim();

  return <QRCodeSVG value={data} size={128} />;
}
