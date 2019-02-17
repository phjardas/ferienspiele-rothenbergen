import React from 'react';
import { Link } from 'react-router-dom';
import Currency from '../Currency';
import Icon from '../Icon';
import classes from './dashboard.module.scss';

export default function Dashboard() {
  const title = 'Helden des Alltags';
  const startDate = new Date('2017-07-01');
  const endDate = new Date('2017-07-05');
  const registrationDeadline = new Date('2017-06-15');
  const prices = {
    base: 35,
    sibling: -10,
  };
  const registrationStatus = 'open';

  return (
    <>
      <div className={`jumbotron jumbotron-fluid ${classes.jumbotron}`}>
        <div className="container">
          <h2 className="display-3">{title}</h2>
          <p className="lead">Ökumenische Ferienspiele in Rothenbergen</p>
          <p>
            Von {startDate.toLocaleDateString()} bis {endDate.toLocaleDateString()}
          </p>

          {registrationStatus === 'open' && (
            <div>
              <p>
                <Link className="btn btn-primary btn-lg mt-3" to="/anmeldung">
                  <Icon icon="child" className="mr-2" />
                  Jetzt anmelden!
                </Link>
                <a className="btn btn-outline-light btn-lg ml-2 mt-3" href="#content">
                  Weitere Informationen
                </a>
              </p>
              Anmeldeschluss ist am {registrationDeadline.toLocaleDateString()}
            </div>
          )}

          {registrationStatus === 'deadlineExpired' && (
            <div className={`alert alert-light ${classes.alert}`}>
              <p>
                <strong>
                  <Icon icon="frown" className="mr-2" /> Leider ist die Anmeldefrist für die Kinderferienspiele abgelaufen.
                </strong>
              </p>
              <p>
                Für eventuelle Rückfragen nehmen Sie bitte telefonisch unter <a href="tel:+4960512649">06051 2649</a> oder per Email unter
                <a href="mailto:gillian.horton-krueger@emk-rothenbergen.de">gillian.horton-krueger@emk-rothenbergen.de</a> Kontakt mit uns
                auf.
              </p>
            </div>
          )}

          {registrationStatus === 'maxParticipants' && (
            <div className={`alert alert-light ${classes.alert}`}>
              <p>
                <strong>
                  <Icon icon="frown" className="mr-2" /> Leider sind schon alle Plätze belegt.
                </strong>
              </p>
              <p>Wir bitten um Ihr Verständnis, dass wir keine weiteren Anmeldungen entgegennehmen können.</p>
            </div>
          )}
        </div>

        <div className={`down-arrow ${classes['down-arrow']}`}>
          <a href="#content" className="fa fa-chevron-down">
            <Icon icon="chevron-down" />
            <span className="sr-only">scroll down</span>
          </a>
        </div>
      </div>

      <div className="container" id="content">
        <div className="row">
          <div className="col-lg-4 mb-5">
            <h3>Das Programm</h3>
            <p>
              Fünf Tage lang dreht sich bei den Ferienspielen in Rothenbergen alles um die Helden des Alltags. Ein Höhepunkt der Woche wird
              unsere Übernachtung in der Bergkirche sein.
            </p>

            <h3 className="mt-5">Wann genau?</h3>
            <p>
              Von {startDate.toLocaleDateString()} bis {endDate.toLocaleDateString()} sind wir jeweils von 9.30 Uhr bis 17.00 Uhr für Euch
              da. Am Donnerstag könnt Ihr zusätzlich an einer Übernachtung teilnehmen. Am Freitag um 17 Uhr ist noch längst nicht Schluss –
              sondern wir laden Eure Familien zum Abschlussgottesdienst und anschließendem Grillfest ein!
            </p>
          </div>

          <div className="col-lg-4 mb-5">
            <h3>Wer genau?</h3>
            <p>
              <strong>IHR, die Kinder:</strong> Im Alter von 7 bis 12 Jahren seid Ihr sehr herzlich eingeladen, bei uns mitzumachen – ganz
              gleich, woher Ihr kommt oder welcher Konfession oder Religion Ihr angehört: Wir freuen uns auf Euch!
            </p>
            <p>
              <strong>WIR, das Team:</strong> Eine fröhliche Mischung aus Jugendlichen und Erwachsenen, ehrenamtlich und voller Energie –
              sowie Pfarrerin Caroline Miesner (ev. Kirchengemeinde Auf dem Berg), Pastorin Gillian Horton-Krüger
              (Evangelisch-methodistische Friedenskirche) und Gemeindereferentin Rita Kunzmann (kath. Gemeinde Christkönig).
            </p>
          </div>

          <div className="col-lg-4 mb-5">
            <h3>Wo genau?</h3>
            <p>
              Auf dem Gelände der Evangelisch-methodistischen Friedenskirche Rothenbergen,{' '}
              <a href="https://goo.gl/maps/HmJgc" target="_blank" rel="noopener noreferrer">
                Kirchbergstraße 10 <Icon icon="external-link-alt" className="ml-1" />
              </a>
              .
            </p>

            <h3 className="mt-5">Wie viel kostet das?</h3>
            <p>
              Die Teilnahme an den Ferienspielen kostet <Currency amount={prices.base} /> und eine Kuchenspende. Geschwisterkinder sind
              ermäßigt (zweites und weitere Kinder je <Currency amount={prices.base + prices.sibling} />, keine weitere Kuchenspende nötig).
              Darin enthalten sind neben dem Programm und dem Material auch das Mittagessen, Getränke, Snacks für zwischendurch und ein
              tolles Ferienspiel-Shirt.
            </p>
            <p>
              Der fantastisch niedrige Preis wird übrigens ermöglicht durch viel ehrenamtliches Engagement, die drei beteiligten Kirchen,
              die Gemeinde Gründau – und unsere Sponsoren!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
