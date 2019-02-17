import React from 'react';
import Icon from '../components/Icon';
import Layout from '../components/Layout';

export default function Imprint() {
  return (
    <Layout>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-3">Impressum</h1>
          <p className="lead">Die Ferienspiele Rothenbergen sind eine Veranstaltung der drei Kirchengemeinden in Rothenbergen:</p>
          <ul>
            <li>Römisch-katholische Kirchengemeinde Christkönig</li>
            <li>Evangelische Kirchengemeinde "Auf dem Berg"</li>
            <li>Evangelisch-methodistische Kirche – Friedenskirche</li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-3">
            <h2 className="display-5">
              Betreiberin <small className="text-muted">gem. § 5 TMG</small>
            </h2>
            <p>
              <strong>Evangelisch-methodistische Kirche</strong>
              <br /> Bezirk Rothenbergen
              <br /> Kirchbergstraße 8-10
              <br /> 63584 Gründau-Rothenbergen
            </p>
            <p>
              <Icon icon="phone" className="mr-2" />
              <a href="tel:+4960512649">06051 2649</a>
              <br />
              <Icon icon="envelope" className="mr-2" />
              <a href="mailto:Karl-Heinz.Rothlaender@EmK-Grossenhausen.de">Karl-Heinz.Rothlaender@EmK-Grossenhausen.de</a>
            </p>
          </div>
          <div className="col-lg-4 mb-3">
            <h2 className="display-5">
              Redaktion <small className="text-muted">gem. § 55 Abs. 2 RStV</small>
            </h2>
            <p>Verantwortlich für redaktionelle Beiträge:</p>

            <p>
              <strong>Karl-Heinz Rothländer</strong>
              <br /> Am Storksberg 1
              <br /> 63589 Linsengericht-Altenhasslau
            </p>

            <p>
              <Icon icon="phone" className="mr-2" />
              <a href="tel:+4960512649">06051 2649</a>
              <br />
              <Icon icon="envelope" className="mr-2" />
              <a href="mailto:Karl-Heinz.Rothlaender@EmK-Grossenhausen.de">Karl-Heinz.Rothlaender@EmK-Grossenhausen.de</a>
            </p>
          </div>
          <div className="col-lg-4 mb-3">
            <h2 className="display-5">Webseite</h2>
            <p>
              Diese Webseite wurde ehrenamtlich und kostenfrei entwickelt von{' '}
              <a href="https://jardas.de/" target="_blank" rel="noopener noreferrer">
                Philipp Jardas <Icon icon="external-link-alt" className="ml-1" />
              </a>
            </p>
          </div>
        </div>

        <div className="mb-3">
          <h2 className="display-5">Haftungshinweis</h2>
          <p>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der
            verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>
        </div>
      </div>
    </Layout>
  );
}
