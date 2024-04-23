import { Box, Card, CardContent, Link, Typography } from "@mui/material";
import React from "react";
import H2 from "../components/H2";
import H3 from "../components/H3";
import Layout from "../components/Layout";

export default function Imprint() {
  return (
    <Layout back={{ to: "/" }}>
      <Card>
        <CardContent>
          <H2>Impressum</H2>
          <Typography paragraph>
            Die Ferienspiele Rothenbergen sind eine Veranstaltung der drei
            Kirchengemeinden in Rothenbergen:
            <br />
            Römisch-katholische Kirchengemeinde Christkönig
            <br />
            Evangelische Kirchengemeinde "Auf dem Berg"
            <br />
            Evangelisch-methodistische Kirche – Friedenskirche
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: ["1fr", "repeat(3, 1fr)"],
              gap: 4,
            }}
          >
            <Box>
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
                <Link href="tel:+4960512649">06051 2649</Link>
                <br />
                <Link href="mailto:ralf.schweinsberg@emk.de">
                  ralf.schweinsberg@emk.de
                </Link>
              </Typography>
            </Box>
            <Box>
              <H3>
                Redaktion <small>gem. § 55 Abs. 2 RStV</small>
              </H3>
              <Typography paragraph>
                Verantwortlich für redaktionelle Beiträge:
              </Typography>

              <Typography paragraph>
                <strong>Ralf Schweinsberg</strong>
                <br /> Evangelisch-methodistische Kirche
                <br /> Kirchbergstraße 8-10
                <br /> 63584 Gründau-Rothenbergen
              </Typography>

              <Typography paragraph>
                <Link href="tel:+4960512649">06051 2649</Link>
                <br />
                <Link href="mailto:ralf.schweinsberg@emk.de">
                  ralf.schweinsberg@emk.de
                </Link>
              </Typography>
            </Box>
            <Box>
              <H3>Webseite</H3>
              <Typography paragraph>
                Diese Webseite wurde ehrenamtlich und kostenfrei entwickelt von{" "}
                <Link
                  href="https://jardas.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Philipp Jardas
                </Link>
              </Typography>
            </Box>
          </Box>

          <H3>Haftungshinweis</H3>
          <Typography paragraph>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
            Haftung für die Inhalte externer Links. Für den Inhalt der
            verlinkten Seiten sind ausschließlich deren Betreiber
            verantwortlich.
          </Typography>
        </CardContent>
      </Card>
    </Layout>
  );
}
