import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import config from "../../api/config";
import Date from "../Date";
import H2 from "../H2";

export default function Welcome({ createTestData, geschwisterkind }) {
  const { startDate, endDate, registrationDeadline, waiverDeadline } = config;

  return (
    <Card>
      <CardContent>
        <H2>Anmeldung</H2>
        {geschwisterkind ? (
          <Alert severity="info">
            Zur Anmeldung eines Geschwisterkindes haben wir das Formular für Sie
            schon so weit wie möglich ausgefüllt.
          </Alert>
        ) : (
          <>
            <Typography paragraph>
              Wir freuen uns, dass Sie Ihr Kind bei den Ferienspielen
              Rothenbergen vom <Date value={startDate} /> bis{" "}
              <Date value={endDate} /> (jeweils 9.00 Uhr bis 16.00 Uhr) anmelden
              wollen.
            </Typography>
            <Typography paragraph>
              <strong>
                Anmeldeschluss ist am <Date value={registrationDeadline} /> -
                oder wenn alle Plätze belegt sind.
              </strong>
            </Typography>
            <Typography paragraph>
              Nach der Anmeldung erhalten Sie von uns eine Email mit einer
              Einverständniserklärung.
            </Typography>
            <Typography paragraph>
              Die Email beinhaltet auch einen Link, unter dem Sie die
              wichtigsten Informationen sowie die Bankverbindung der
              Evangelisch-Methodistischen Kirche finden.
            </Typography>
            <Typography paragraph>
              Die Einverständniserklärung lassen Sie uns bitte unterschrieben
              zukommen und überweisen den Teilnahmebeitrag bis zum{" "}
              <Date value={waiverDeadline} /> auf das angegebene Konto.
            </Typography>
            <Typography fontWeight="bold" paragraph>
              Bitte beachten Sie, dass die Anmeldung erst vollständig ist, wenn
              Einverständniserklärung und Teilnahmebeitrag bei uns eingegangen
              sind!
            </Typography>
            <Typography>
              Bei nachträglichen Änderungen nehmen Sie bitte unter{" "}
              <Link href="mailto:ferienspiele@kirche-aufdemberg.de">
                ferienspiele@kirche-aufdemberg.de
              </Link>{" "}
              Kontakt mit uns auf.
            </Typography>
          </>
        )}
      </CardContent>
      {createTestData && (
        <CardActions>
          <Button color="primary" onClick={createTestData}>
            Testdaten erzeugen
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
