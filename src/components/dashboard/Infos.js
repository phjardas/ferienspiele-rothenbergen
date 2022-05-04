import { Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import config from '../../api/config';
import Currency from '../Currency';
import Date from '../Date';
import H3 from '../H3';

const { startDate, endDate, prices, earlyCarePlaces } = config;

export default function Infos() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={4}>
        <H3>Das Programm</H3>
        <Typography paragraph>
          „Ein Fest für die Sinne“ – so lautet das Thema der ökumenischen Ferienspiele für Niedergründau und Rothenbergen in diesem Jahr,
          die rund um die Bergkirche in Niedergründau stattfinden.
        </Typography>
        <Typography paragraph>
          Spielerisch erkunden wir die Welt! Wir werden gemeinsam singen, basteln, etwas von Gott erfahren und ganz viel Spaß haben, toben,
          neue Freundschaften schließen und natürlich alle unsere Sinne ausprobieren.
        </Typography>
        <Typography paragraph>
          Unser Ausflug führt uns in diesem Jahr in den Kletterwald in Büdingen. Auch eine Übernachtung planen wir wieder ein. Die
          Jugendfeuerwehr bereitet außerdem Wasserspiele für uns vor.
        </Typography>
      </Grid>

      <Grid item xs={12} lg={4}>
        <H3>Wer genau?</H3>
        <Typography paragraph>
          <strong>IHR, die Kinder:</strong> Im Alter von 7 bis 12 Jahren seid Ihr sehr herzlich eingeladen, bei uns mitzumachen – ganz
          gleich, vorher Ihr kommt oder welcher Konfession oder Religion Ihr angehört, wir freuen uns auf Euch!
        </Typography>
        <Typography paragraph>
          <strong>WIR, das Team:</strong> Eine bunte Mischung aus Jugendlichen und Erwachsenen, ehrenamtlich und voller Energie für Eure
          Action… Und dazu noch Pfarrerin Ligaya Jardas (ev. Kirchengemeinde Auf dem Berg) und Pastor Ralf Schweinsberg
          (Evangelisch-methodistische Kirche).
        </Typography>

        <H3>&hellip;und immer noch Corona</H3>
        <Typography paragraph>
          Wir können noch nicht absehen, ob und wenn ja, welche Maßnahmen im Sommer ergriffen werden müssen. Dass wir die meiste Zeit im
          Freien verbringen, macht dem Virus jedenfalls das Leben schwerer und uns leichter!
        </Typography>
        <Typography paragraph>
          Wir bitten Euch um Verständnis, dass wir zu diesem Zeitpunkt keine verbindlichen Vorgaben machen können, es aber – je nach
          Pandemiegeschehen und/oder geplanter Aktivität – sein kann, dass wir zur gegenseitigen Sicherheit morgens um einen Test oder
          kurzzeitig um das Tragen einer Maske bitten werden.
        </Typography>
      </Grid>

      <Grid item xs={12} lg={4}>
        <H3>Wann genau?</H3>
        <Typography paragraph>
          Von <Date value={startDate} /> bis <Date value={endDate} /> sind wir jeweils von 9.00 Uhr bis 16.00 Uhr für Euch da.
        </Typography>

        <Typography paragraph>
          Für berufstätige Eltern bieten wir in diesem Jahr {earlyCarePlaces} Plätze in einer (Not-)Frühbetreuung von 8.00 Uhr bis 9.00 Uhr
          an. Wir bitten euch herzlich, dass diese Plätze ausschließlich von Familien genutzt werden, die keine andere Möglichkeit haben,
          ihre Kinder zu dieser früheren Uhrzeit betreuen zu lassen. Danke, dass Ihr da aufeinander Rücksicht nehmt!
        </Typography>
        <Typography paragraph>
          Am Freitag gibt es zum Abschluss der Ferienspiele einen Gottesdienst mit Eltern und Geschwistern um 14.30 Uhr.
        </Typography>

        <H3>Wo genau?</H3>
        <Typography paragraph>
          Auf dem Gelände rund um die evangelische Bergkirche in Niedergründau,{' '}
          <Link href="https://goo.gl/maps/ZH62ALCbZyurS5sR9" target="_blank" rel="noopener noreferrer">
            Schieferbergstr. 33
          </Link>
          .
        </Typography>

        <H3>Wie viel kostet das?</H3>
        <Typography paragraph>
          Die Teilnahme an den Ferienspielen kostet <Currency amount={prices.base} /> und eine Kuchenspende. Geschwisterkinder sind ermäßigt
          (zweites und weitere Kinder je <Currency amount={prices.base + prices.sibling} />, keine weitere Kuchenspende nötig). Darin
          enthalten sind neben dem Programm und dem Material auch das Mittagessen, Getränke, Snacks für zwischendurch, ein tolles
          Ferienspiel-Shirt und der Ausflug in den Kletterpark.
        </Typography>
        <Typography paragraph>
          Der fantastisch niedrige Preis wird übrigens ermöglicht durch viel ehrenamtliches Engagement, die drei beteiligten Kirchen und die
          Gemeinde Gründau.
        </Typography>
      </Grid>
    </Grid>
  );
}
