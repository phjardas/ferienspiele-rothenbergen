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
        [theme.breakpoints.up('md')]: { gridTemplateColumns: 'repeat(3, 1fr)' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap }}>
        <Card>
          <CardContent>
            <H3>Das Programm</H3>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(1) }}>
              <Typography>
                „Ein Fest für die Sinne“ – so lautet das Thema der ökumenischen Ferienspiele für Niedergründau und Rothenbergen in diesem
                Jahr, die rund um die Bergkirche in Niedergründau stattfinden.
              </Typography>
              <Typography>
                Spielerisch erkunden wir die Welt! Wir werden gemeinsam singen, basteln, etwas von Gott erfahren und ganz viel Spaß haben,
                toben, neue Freundschaften schließen und natürlich alle unsere Sinne ausprobieren.
              </Typography>
              <Typography>
                Unser Ausflug führt uns in diesem Jahr in den Kletterwald in Büdingen. Auch eine Übernachtung planen wir wieder ein. Die
                Jugendfeuerwehr bereitet außerdem Wasserspiele für uns vor.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap }}>
        <Card>
          <CardContent>
            <H3>Wer genau?</H3>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(1) }}>
              <Typography>
                <strong>IHR, die Kinder:</strong> Im Alter von 7 bis 12 Jahren seid Ihr sehr herzlich eingeladen, bei uns mitzumachen – ganz
                gleich, vorher Ihr kommt oder welcher Konfession oder Religion Ihr angehört, wir freuen uns auf Euch!
              </Typography>
              <Typography>
                <strong>WIR, das Team:</strong> Eine bunte Mischung aus Jugendlichen und Erwachsenen, ehrenamtlich und voller Energie für
                Eure Action… Und dazu noch Pfarrerin Ligaya Jardas (ev. Kirchengemeinde Auf dem Berg) und Pastor Ralf Schweinsberg
                (Evangelisch-methodistische Kirche).
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <H3>&hellip;und immer noch Corona</H3>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(1) }}>
              <Typography>
                Wir können noch nicht absehen, ob und wenn ja, welche Maßnahmen im Sommer ergriffen werden müssen. Dass wir die meiste Zeit
                im Freien verbringen, macht dem Virus jedenfalls das Leben schwerer und uns leichter!
              </Typography>
              <Typography>
                Wir bitten Euch um Verständnis, dass wir zu diesem Zeitpunkt keine verbindlichen Vorgaben machen können, es aber – je nach
                Pandemiegeschehen und/oder geplanter Aktivität – sein kann, dass wir zur gegenseitigen Sicherheit morgens um einen Test oder
                kurzzeitig um das Tragen einer Maske bitten werden.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap }}>
        <Card>
          <CardContent>
            <H3>Wann genau?</H3>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(1) }}>
              <Typography>
                Von <Date value={startDate} /> bis <Date value={endDate} /> sind wir jeweils von 9.00 Uhr bis 16.00 Uhr für Euch da.
              </Typography>
              <Typography>
                Für berufstätige Eltern bieten wir in diesem Jahr {earlyCarePlaces} Plätze in einer (Not-)Frühbetreuung von 8.00 Uhr bis
                9.00 Uhr an. Wir bitten euch herzlich, dass diese Plätze ausschließlich von Familien genutzt werden, die keine andere
                Möglichkeit haben, ihre Kinder zu dieser früheren Uhrzeit betreuen zu lassen. Danke, dass Ihr da aufeinander Rücksicht
                nehmt!
              </Typography>
              <Typography>
                Am Freitag gibt es zum Abschluss der Ferienspiele einen Gottesdienst mit Eltern und Geschwistern um 14.30 Uhr.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <H3>Wo genau?</H3>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(1) }}>
              <Typography>
                Auf dem Gelände rund um die evangelische Bergkirche in Niedergründau,{' '}
                <Link href="https://goo.gl/maps/ZH62ALCbZyurS5sR9" target="_blank" rel="noopener noreferrer">
                  Schieferbergstr. 33
                </Link>
                .
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <H3>Wie viel kostet das?</H3>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(1) }}>
              <Typography>
                Die Teilnahme an den Ferienspielen kostet <Currency amount={prices.base} /> und eine Kuchenspende. Geschwisterkinder sind
                ermäßigt (zweites und weitere Kinder je <Currency amount={prices.base + prices.sibling} />, keine weitere Kuchenspende
                nötig). Darin enthalten sind neben dem Programm und dem Material auch das Mittagessen, Getränke, Snacks für zwischendurch,
                ein tolles Ferienspiel-Shirt und der Ausflug in den Kletterpark.
              </Typography>
              <Typography>
                Der fantastisch niedrige Preis wird übrigens ermöglicht durch viel ehrenamtliches Engagement, die drei beteiligten Kirchen
                und die Gemeinde Gründau.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
