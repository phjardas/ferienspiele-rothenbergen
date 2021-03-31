import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import config from '../../api/config';
import Currency from '../Currency';
import Date from '../Date';
import H3 from '../H3';

export default function Infos() {
  const { startDate, endDate, prices } = config;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={4}>
        <H3>Das Programm</H3>
        <Typography paragraph>
          „In 5 Tagen um die Welt“ – so lautet das Thema der ökumenischen Ferienspiele für Rothenbergen und Niedergründau, die dieses Jahr
          wieder stattfinden sollen. Wir wollen mit den Kinder spielerisch auf eine Weltreise gehen. Wir wollen rauskriegen, was man an
          anderen Orten der Welt so isst, mit was man spielt, was für Musik man macht und vieles mehr. Die Ferienspiele bieten in gewohnter
          Weise eine bunte Mischung aus sportlichen Aktionen, Basteln und Spielen. Natürlich immer unter der Voraussetzung, dass die
          Pandemie-Situation es im Sommer zulässt, dass Ferienspiel durchgeführt werden können.
        </Typography>

        <Typography paragraph>
          Und natürlich wird in diesem Jahr wegen Corona einiges anders sein als sonst, so werden wir viel in Kleingruppen machen und auf
          eine Übernachtung, einen Ausflug und ein Abschlussfest verzichten. Ort der Ferienspiele ist erstmalig das Gelände rund um die
          Bergkirche.
        </Typography>
      </Grid>

      <Grid item xs={12} lg={4}>
        <H3>Wer genau?</H3>
        <Typography paragraph>
          <strong>IHR, die Kinder:</strong> Im Alter von 7 bis 12 Jahren seid Ihr sehr herzlich eingeladen, bei uns mitzumachen – ganz
          gleich, woher Ihr kommt oder welcher Konfession oder Religion Ihr angehört: Wir freuen uns auf Euch!
        </Typography>
        <Typography paragraph>
          <strong>WIR, das Team:</strong> Eine fröhliche Mischung aus Jugendlichen und Erwachsenen, ehrenamtlich und voller Energie – sowie
          Pfarrerin Caroline Miesner (ev. Kirchengemeinde Auf dem Berg), Pastorin Gillian Horton-Krüger (Evangelisch-methodistische
          Friedenskirche) und Gemeindereferentin Rita Kunzmann (kath. Gemeinde Christkönig).
        </Typography>

        <H3>COVID-19</H3>
        <Typography paragraph>
          Wegen Corona möchte wir bei der Zuteilung der Gruppen darauf achten, dass Geschwisterkinder und befreundete Kinder, die auch sonst
          viel gemeinsam unternehmen oder in einer Klasse sind, zusammen in eine Gruppe kommen. Geben Sie dies deshalb bei der Anmeldung mit
          an.
        </Typography>
      </Grid>

      <Grid item xs={12} lg={4}>
        <H3>Wann genau?</H3>
        <Typography paragraph>
          Von <Date value={startDate} /> bis <Date value={endDate} /> sind wir jeweils von 9.00 Uhr bis 16.00 Uhr für Euch da. Am Freitag
          endet die Ferienspielwoche mit einem Gottesdienst am frühen Nachmittag.
        </Typography>

        <H3>Wo genau?</H3>
        <Typography paragraph>
          Auf dem Gelände der evangelischen Bergkirche in Niedergründau,{' '}
          <a href="https://goo.gl/maps/ZH62ALCbZyurS5sR9" target="_blank" rel="noopener noreferrer">
            Schieferbergstr. 33
          </a>
          .
        </Typography>

        <H3>Wie viel kostet das?</H3>
        <Typography paragraph>
          Die Teilnahme an den Ferienspielen kostet <Currency amount={prices.base} /> und eine Kuchenspende. Geschwisterkinder sind ermäßigt
          (zweites und weitere Kinder je <Currency amount={prices.base + prices.sibling} />, keine weitere Kuchenspende nötig). Darin
          enthalten sind neben dem Programm und dem Material auch das Mittagessen, Getränke, Snacks für zwischendurch und ein tolles
          Ferienspiel-Shirt.
        </Typography>
        <Typography paragraph>
          Der fantastisch niedrige Preis wird übrigens ermöglicht durch viel ehrenamtliches Engagement, die drei beteiligten Kirchen, die
          Gemeinde Gründau – und unsere Sponsoren!
        </Typography>
      </Grid>
    </Grid>
  );
}
