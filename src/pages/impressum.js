import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import H2 from '../components/H2';
import H3 from '../components/H3';

export default function Imprint() {
  return (
    <>
      <H2>Impressum</H2>
      <Typography paragraph>
        Die Ferienspiele Rothenbergen sind eine Veranstaltung der drei Kirchengemeinden in Rothenbergen:
        <br />
        Römisch-katholische Kirchengemeinde Christkönig
        <br />
        Evangelische Kirchengemeinde "Auf dem Berg"
        <br />
        Evangelisch-methodistische Kirche – Friedenskirche
      </Typography>

      <Grid container spacing={2}>
        <Grid item lg={4}>
          <H3>
            Betreiberin <small>gem. § 5 TMG</small>
          </H3>
          <Typography paragraph>
            <strong>Evangelisch-methodistische Kirche</strong>
            <br /> Bezirk Rothenbergen
            <br /> Kirchbergstraße 8-10
            <br /> 63584 Gründau-Rothenbergen
          </Typography>
          <Typography paragraph>
            <a href="tel:+4960512649">06051 2649</a>
            <br />
            <a href="mailto:gillian.horton-krueger@emk.de">gillian.horton-krueger@emk.de</a>
          </Typography>
        </Grid>
        <Grid item lg={4}>
          <H3>
            Redaktion <small>gem. § 55 Abs. 2 RStV</small>
          </H3>
          <Typography paragraph>Verantwortlich für redaktionelle Beiträge:</Typography>

          <Typography paragraph>
            <strong>Gillian Horton-Krüger</strong>
            <br /> Evangelisch-methodistische Kirche
            <br /> Kirchbergstraße 8-10
            <br /> 63584 Gründau-Rothenbergen
          </Typography>

          <Typography paragraph>
            <a href="tel:+4960512649">06051 2649</a>
            <br />
            <a href="mailto:gillian.horton-krueger@emk.de">gillian.horton-krueger@emk.de</a>
          </Typography>
        </Grid>
        <Grid item lg={4}>
          <H3>Webseite</H3>
          <Typography paragraph>
            Diese Webseite wurde ehrenamtlich und kostenfrei entwickelt von{' '}
            <a href="https://jardas.de/" target="_blank" rel="noopener noreferrer">
              Philipp Jardas
            </a>
          </Typography>
        </Grid>
      </Grid>

      <H3>Haftungshinweis</H3>
      <Typography paragraph>
        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten
        Seiten sind ausschließlich deren Betreiber verantwortlich.
      </Typography>
    </>
  );
}
