import React from 'react';
import Currency from '../Currency';
import Date from '../Date';
import{Place as PlaceIcon} from '@material-ui/icons'

export default function Infos({ startDate, endDate, prices }) {
  return (
    <div className="row">
      <div className="col-lg-4 mb-5">
        <h3>Das Programm</h3>
        <p>
          Fünf Tage lang dreht sich bei den Ferienspielen in Rothenbergen alles um die Helden des Alltags. Ein Höhepunkt der Woche wird
          unsere Übernachtung in der Bergkirche sein.
        </p>

        <h3 className="mt-5">Wann genau?</h3>
        <p>
          Von <Date value={startDate} /> bis <Date value={endDate} /> sind wir jeweils von 9.30 Uhr bis 17.00 Uhr für Euch da. Am Donnerstag
          könnt Ihr zusätzlich an einer Übernachtung teilnehmen. Am Freitag um 17 Uhr ist noch längst nicht Schluss – sondern wir laden Eure
          Familien zum Abschlussgottesdienst und anschließendem Grillfest ein!
        </p>
      </div>

      <div className="col-lg-4 mb-5">
        <h3>Wer genau?</h3>
        <p>
          <strong>IHR, die Kinder:</strong> Im Alter von 7 bis 12 Jahren seid Ihr sehr herzlich eingeladen, bei uns mitzumachen – ganz
          gleich, woher Ihr kommt oder welcher Konfession oder Religion Ihr angehört: Wir freuen uns auf Euch!
        </p>
        <p>
          <strong>WIR, das Team:</strong> Eine fröhliche Mischung aus Jugendlichen und Erwachsenen, ehrenamtlich und voller Energie – sowie
          Pfarrerin Caroline Miesner (ev. Kirchengemeinde Auf dem Berg), Pastorin Gillian Horton-Krüger (Evangelisch-methodistische
          Friedenskirche) und Gemeindereferentin Rita Kunzmann (kath. Gemeinde Christkönig).
        </p>
      </div>

      <div className="col-lg-4 mb-5">
        <h3>Wo genau?</h3>
        <p>
          Auf dem Gelände der Evangelisch-methodistischen Friedenskirche Rothenbergen,{' '}
          <a href="https://goo.gl/maps/HmJgc" target="_blank" rel="noopener noreferrer">
            Kirchbergstraße 10 <PlaceIcon/>
          </a>
          .
        </p>

        <h3 className="mt-5">Wie viel kostet das?</h3>
        <p>
          Die Teilnahme an den Ferienspielen kostet <Currency amount={prices.base} /> und eine Kuchenspende. Geschwisterkinder sind ermäßigt
          (zweites und weitere Kinder je <Currency amount={prices.base + prices.sibling} />, keine weitere Kuchenspende nötig). Darin
          enthalten sind neben dem Programm und dem Material auch das Mittagessen, Getränke, Snacks für zwischendurch und ein tolles
          Ferienspiel-Shirt.
        </p>
        <p>
          Der fantastisch niedrige Preis wird übrigens ermöglicht durch viel ehrenamtliches Engagement, die drei beteiligten Kirchen, die
          Gemeinde Gründau – und unsere Sponsoren!
        </p>
      </div>
    </div>
  );
}
