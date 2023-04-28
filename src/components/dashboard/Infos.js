import { Box, Link, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import config from '../../api/config';
import Card from '../Card';
import CardContent from '../CardContent';
import Currency from '../Currency';
import Date from '../Date';
import H3 from '../H3';

const { startDate, endDate, prices, earlyCarePlaces } = config;

export default function Infos() {
  const theme = useTheme();
  const gap = theme.spacing(3);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'masonry',
        gap,
        [theme.breakpoints.up('md')]: { gridTemplateColumns: 'repeat(2, 1fr)' },
      }}
    >
      <Card>
        <CardContent>
          <H3>Das Programm</H3>
          <Typography paragraph>
            Wir wollen feiern! Und zwar einige der Highlights, die ein Jahreskreis so zu bieten hat: Ein ganzes Jahr in nur 5 Tagen.
          </Typography>
          <Typography paragraph>
            Mit einem schmetternden “O du fröhliche” und bunter Verkleidung, mit Laternen zur Nachtwanderung, versteckten Eiern im
            Kirchgarten und leckeren Erntegaben auf dem Tisch... Wir werden feierlich und stimmungsvoll sein, laut und lebhaft, voller
            Musik, Spiel, Spaß, Freundschaft untereinander – und mit Gott.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <H3>Wer genau?</H3>
          <Typography paragraph>
            <strong>IHR, die Kinder:</strong> Im Alter von 7 bis 12 Jahren seid Ihr sehr herzlich eingeladen, bei uns mitzumachen – ganz
            gleich, vorher Ihr kommt oder welcher Konfession oder Religion Ihr angehört, wir freuen uns auf Euch!
          </Typography>
          <Typography paragraph>
            <strong>WIR, das Team:</strong> Eine bunte Mischung aus Jugendlichen und Erwachsenen, ehrenamtlich und voller Energie für Eure
            Action… Und dazu noch Pfarrerin Ligaya Jardas (ev. Kirchengemeinde Auf dem Berg), Pastor Ralf Schweinsberg
            (Evangelisch-methodistische Kirche) und Gemeindereferentin i.R. Rita Kunzmann (katholische Gemeinde Sankt Raphael).
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <H3>Wann genau?</H3>
          <Typography paragraph>
            Von <Date value={startDate} /> bis <Date value={endDate} /> sind wir jeweils von 9.00 Uhr bis 16.00 Uhr für Euch da.
          </Typography>
          <Typography paragraph>
            Für berufstätige Eltern bieten wir auch in diesem Jahr {earlyCarePlaces} Plätze in einer (Not-)Frühbetreuung von 8.00 Uhr bis
            9.00 Uhr an. Wir bitten euch herzlich, dass diese Plätze ausschließlich von Familien genutzt werden, die keine andere
            Möglichkeit haben, ihre Kinder zu dieser früheren Uhrzeit betreuen zu lassen. Danke, dass Ihr da aufeinander Rücksicht nehmt!
          </Typography>
          <Typography paragraph>
            Am Freitag gibt es zum Abschluss der Ferienspiele einen Gottesdienst mit Eltern und Geschwistern um 15.00 Uhr.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <H3>Wo genau?</H3>
          <Typography paragraph>
            Auf dem Gelände rund um die Bergkirche in Niedergründau,{' '}
            <Link href="https://goo.gl/maps/ZH62ALCbZyurS5sR9" target="_blank" rel="noopener noreferrer">
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
            Die Teilnahme an den Ferienspielen kostet <Currency amount={prices.base} /> und eine Kuchenspende. Geschwisterkinder sind
            ermäßigt (zweites und weitere Kinder je <Currency amount={prices.base + prices.sibling} />, keine weitere Kuchenspende nötig).
          </Typography>
          <Typography paragraph>
            Im Preis enthalten sind Verpflegung und Materialkosten, T-Shirt und der Ausflug in den Kletterpark.
          </Typography>
          <Typography paragraph>
            Dieser fantastisch niedrige Preis wird übrigens ermöglicht durch viel ehrenamtliches Engagement, die drei beteiligten
            Kirchengemeinen, die Gemeinde Gründau und einige treue Spender und Sponsoren – vielen Dank dafür!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
