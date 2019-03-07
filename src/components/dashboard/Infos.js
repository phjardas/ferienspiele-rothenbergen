import { Grid } from '@material-ui/core';
import { Place as PlaceIcon } from '@material-ui/icons';
import React from 'react';
import config from '../../api/config';
import Currency from '../Currency';
import Date from '../Date';
import H3 from '../H3';
import P from '../P';

export default function Infos() {
  const { startDate, endDate, prices } = config;

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} lg={4}>
        <H3>Das Programm</H3>
        <P>
          Fünf Tage lang dreht sich bei den Ferienspielen in Rothenbergen alles um die Helden des Alltags. Ein Höhepunkt der Woche wird
          unsere Übernachtung in der Bergkirche sein.
        </P>

        <H3>Wann genau?</H3>
        <P>
          Von <Date value={startDate} /> bis <Date value={endDate} /> sind wir jeweils von 9.30 Uhr bis 17.00 Uhr für Euch da. Am Donnerstag
          könnt Ihr zusätzlich an einer Übernachtung teilnehmen. Am Freitag um 17 Uhr ist noch längst nicht Schluss – sondern wir laden Eure
          Familien zum Abschlussgottesdienst und anschließendem Grillfest ein!
        </P>
      </Grid>

      <Grid item xs={12} lg={4}>
        <H3>Wer genau?</H3>
        <P>
          <strong>IHR, die Kinder:</strong> Im Alter von 7 bis 12 Jahren seid Ihr sehr herzlich eingeladen, bei uns mitzumachen – ganz
          gleich, woher Ihr kommt oder welcher Konfession oder Religion Ihr angehört: Wir freuen uns auf Euch!
        </P>
        <P>
          <strong>WIR, das Team:</strong> Eine fröhliche Mischung aus Jugendlichen und Erwachsenen, ehrenamtlich und voller Energie – sowie
          Pfarrerin Caroline Miesner (ev. Kirchengemeinde Auf dem Berg), Pastorin Gillian Horton-Krüger (Evangelisch-methodistische
          Friedenskirche) und Gemeindereferentin Rita Kunzmann (kath. Gemeinde Christkönig).
        </P>
      </Grid>

      <Grid item xs={12} lg={4}>
        <H3>Wo genau?</H3>
        <P>
          Auf dem Gelände der Evangelisch-methodistischen Friedenskirche Rothenbergen,{' '}
          <a href="https://goo.gl/maps/HmJgc" target="_blank" rel="noopener noreferrer">
            Kirchbergstraße 10 <PlaceIcon />
          </a>
          .
        </P>

        <H3>Wie viel kostet das?</H3>
        <P>
          Die Teilnahme an den Ferienspielen kostet <Currency amount={prices.base} /> und eine Kuchenspende. Geschwisterkinder sind ermäßigt
          (zweites und weitere Kinder je <Currency amount={prices.base + prices.sibling} />, keine weitere Kuchenspende nötig). Darin
          enthalten sind neben dem Programm und dem Material auch das Mittagessen, Getränke, Snacks für zwischendurch und ein tolles
          Ferienspiel-Shirt.
        </P>
        <P>
          Der fantastisch niedrige Preis wird übrigens ermöglicht durch viel ehrenamtliches Engagement, die drei beteiligten Kirchen, die
          Gemeinde Gründau – und unsere Sponsoren!
        </P>
      </Grid>
    </Grid>
  );
}
