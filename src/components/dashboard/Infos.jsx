import { Box, Card, CardContent, Link, Typography } from "@mui/material";
import React from "react";
import { primary950 } from "../../Theme";
import config from "../../api/config";
import Currency from "../Currency";
import Date from "../Date";
import H3 from "../H3";

const { startDate, endDate, prices, earlyCarePlaces } = config;

export default function Infos() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: ["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"],
        gap: 2,
        ".MuiPaper-root": {
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? primary950 : undefined,
        },
      }}
    >
      <Card>
        <CardContent>
          <H3>Kommt mit auf eine besondere Reise!</H3>
          <Typography paragraph>
            Wir verwandeln die Bergkirche in eine Zeitmaschine und entdecken
            vergangene Epochen. Welche Gefahren lauerten in der Urzeit? Wie
            lebten die alten Ägypter, die Kelten und die Menschen im
            Mittelalter? Und was wäre, wenn wir in die Zukunft reisen könnten?!
          </Typography>
          <Typography paragraph>
            Außerdem erwartet uns die Freiwillige Feuerwehr Niedergründau zu
            patschnassen Wasserspielen, bei denen wir uns abkühlen können. Mit
            dem Reisebus machen wir einen spannenden Ausflug, und von Donnerstag
            auf Freitag übernachten wir gemeinsam in der
            Evangelisch-methodistischen Friedenskirche Rothenbergen.
          </Typography>
          <Typography paragraph>
            Eure Familien sind herzlich zum Abschlussgottesdienst am Freitag um
            15 Uhr eingeladen.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <H3>Wer genau?</H3>
          <Typography paragraph>
            <strong>IHR, die Kinder:</strong> Im Alter von 7 bis 12 Jahren seid
            Ihr sehr herzlich eingeladen, bei uns mitzumachen – ganz gleich,
            vorher Ihr kommt oder welcher Konfession oder Religion Ihr angehört,
            wir freuen uns auf Euch!
          </Typography>
          <Typography paragraph>
            <strong>WIR, das Team:</strong> Eine bunte Mischung aus Jugendlichen
            und Erwachsenen, ehrenamtlich und voller Energie für Eure Action…
            Und dazu noch Pfarrerin Ligaya Jardas (ev. Kirchengemeinde Auf dem
            Berg), Pastor Ralf Schweinsberg (Evangelisch-methodistische Kirche)
            und Gemeindereferentin i.R. Rita Kunzmann (katholische Gemeinde
            Sankt Raphael).
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <H3>Wann genau?</H3>
          <Typography paragraph>
            Von <Date value={startDate} /> bis <Date value={endDate} /> sind wir
            jeweils von 9.00 Uhr bis 16.00 Uhr für Euch da.
          </Typography>
          <Typography paragraph>
            Für berufstätige Eltern bieten wir auch in diesem Jahr{" "}
            {earlyCarePlaces} Plätze in einer (Not-)Frühbetreuung von 8.00 Uhr
            bis 9.00 Uhr an. Wir bitten euch herzlich, dass diese Plätze
            ausschließlich von Familien genutzt werden, die keine andere
            Möglichkeit haben, ihre Kinder zu dieser früheren Uhrzeit betreuen
            zu lassen. Danke, dass Ihr da aufeinander Rücksicht nehmt!
          </Typography>
          <Typography paragraph>
            Am Freitag gibt es zum Abschluss der Ferienspiele einen Gottesdienst
            mit Eltern und Geschwistern um 15.00 Uhr.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <H3>Wo genau?</H3>
          <Typography paragraph>
            Auf dem Gelände rund um die Bergkirche in Niedergründau,{" "}
            <Link
              href="https://goo.gl/maps/ZH62ALCbZyurS5sR9"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schieferbergstr. 33
            </Link>
            .
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <H3>Wie viel kostet das?</H3>
          <Typography paragraph>
            Die Teilnahme an den Ferienspielen kostet{" "}
            <Currency amount={prices.base} /> und eine Kuchenspende.
            Geschwisterkinder sind ermäßigt (zweites und weitere Kinder je{" "}
            <Currency amount={prices.base + prices.sibling} />, keine weitere
            Kuchenspende nötig).
          </Typography>
          <Typography paragraph>
            Im Preis enthalten sind Verpflegung und Materialkosten, T-Shirt und
            ein Tagesausflug.
          </Typography>
          <Typography paragraph>
            Dieser fantastisch niedrige Preis wird übrigens ermöglicht durch
            viel ehrenamtliches Engagement, die drei beteiligten
            Kirchengemeinen, die Gemeinde Gründau und einige treue Spender und
            Sponsoren – vielen Dank dafür!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
