import { Box, Card, CardContent, Link, Typography } from "@mui/material";
import config from "../../api/config";
import Currency from "../Currency";
import Date from "../Date";
import H3 from "../H3";

const { startDate, endDate, prices, earlyCarePlaces } = config;

export default function Infos() {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: ["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"],
          gap: 2,
        }}
      >
        <Card>
          <CardContent>
            <H3>Kunterbunt… Eine spannende Reise in die Welt der Emotionen!</H3>
            <Typography gutterBottom>
              Jeden Tag, jede Minute, jede Sekunde ist eine Menge los – auch in
              uns drin! Mal strahlend hell wie eine aufblühende Blume, aufgeregt
              flatternd wie ein kleiner Vogel, grün vor Neid, zur Weißglut
              getrieben, ängstlich-blass oder erwartungsvoll glitzernd wie
              Tautropfen im Morgenlicht…
            </Typography>
            <Typography gutterBottom>
              Wie fühle ich mich in welcher Situation, fühlst du ähnlich oder
              ganz anders als ich – wie können wir ausdrücken, was in uns los
              ist, wie können einander verstehen, was wollen uns unsere Gefühle
              sagen und wie können wir lernen, mit der Vielfalt der Gefühle
              umzugehen?
            </Typography>
            <Typography gutterBottom>
              Auf dem Gelände rund um die Bergkirche erwarten euch fünf tolle
              Tage rund um die Welt der Gefühle – und natürlich jede Menge
              Action, Lieder, tolle Menschen, Spiele, Spaß und Geschichten von
              Gott und seiner Liebe zu uns.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <H3>Wer genau?</H3>
            <Typography gutterBottom>
              <strong>IHR, die Kinder:</strong> Im Alter von 7 (d.h. wenn Ihr
              nach den Sommerferien in die 2. Klasse kommt) bis 12 Jahren seid
              Ihr herzlich eingeladen, bei uns mitzumachen – ganz gleich, woher
              Ihr kommt oder welcher Konfession oder Religion Ihr angehört, wir
              freuen uns auf Euch!
            </Typography>
            <Typography gutterBottom>
              <strong>WIR, das Team:</strong> Eine bunte Mischung aus
              Jugendlichen und Erwachsenen, ehrenamtlich und voller Energie für
              Eure Action… Und dazu noch Pfarrerin Ligaya Jardas (ev.
              Kirchengemeinde Auf dem Berg), Pastor Ralf Schweinsberg
              (ev.-methodistische Kirche) und Gemeindereferentin Julijana Bös
              (katholische Gemeinde Sankt Raphael).
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <H3>Wann genau?</H3>
            <Typography gutterBottom>
              Vom <Date value={startDate} /> bis <Date value={endDate} /> sind
              wir jeweils von 9.00 Uhr bis 16.00 Uhr für Euch da.
            </Typography>
            <Typography gutterBottom>
              Wer mag, kann zusätzlich von Donnerstag auf Freitag an der
              Übernachtung in der Evangelisch-Methodistischen Kirche in
              Rothenbergen teilnehmen.
            </Typography>
            <Typography gutterBottom>
              Für berufstätige Eltern bieten wir auch in diesem Jahr{" "}
              {earlyCarePlaces} Plätze in einer (Not-)Frühbetreuung von 8.00 Uhr
              bis 9.00 Uhr an. Wir bitten euch herzlich, dass diese Plätze
              ausschließlich von Familien genutzt werden, die keine andere
              Möglichkeit haben, ihre Kinder zu dieser früheren Uhrzeit betreuen
              zu lassen. Danke, dass Ihr da aufeinander Rücksicht nehmt!
            </Typography>
            <Typography gutterBottom>
              Am Freitag gibt es zum Abschluss der Ferienspiele einen
              Gottesdienst mit Eltern und Geschwistern um 15.00 Uhr.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <H3>Wo genau?</H3>
            <Typography gutterBottom>
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
            <Typography gutterBottom>
              Die Teilnahme an den Ferienspielen kostet{" "}
              <Currency amount={prices.base} /> und eine Kuchenspende.
              Geschwisterkinder sind ermäßigt (zweites und weitere Kinder je{" "}
              <Currency amount={prices.base + prices.sibling} />, keine weitere
              Kuchenspende nötig).
            </Typography>
            <Typography gutterBottom>
              Im Preis enthalten sind Verpflegung und Materialkosten, T-Shirt
              und ein Tagesausflug.
            </Typography>
            <Typography gutterBottom>
              Dieser fantastisch niedrige Preis wird übrigens ermöglicht durch
              viel ehrenamtliches Engagement, die drei beteiligten
              Kirchengemeinen, die Gemeinde Gründau und einige treue Spender und
              Sponsoren – vielen Dank dafür!
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
