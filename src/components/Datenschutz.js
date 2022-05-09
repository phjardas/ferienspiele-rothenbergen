import { Typography } from '@material-ui/core';
import React from 'react';
import H3 from './H3';
import config from '../api/config';

export default function Datenschutz() {
  return (
    <>
      <H3>Geltungsbereich</H3>
      <Typography paragraph>
        Diese Datenschutzerklärung soll die Nutzer dieser Website gemäß Bundesdatenschutzgesetz und Telemediengesetz über die Art, den
        Umfang und den Zweck der Erhebung und Verwendung personenbezogener Daten durch den Websitebetreiber, die Evangelisch-methodistische
        Kirche Bezirk Rothenbergen (Kirchbergstraße 8-10, 63584 Gründau) informieren.
      </Typography>
      <Typography paragraph>
        Wir nehmen Ihren Datenschutz sehr ernst und behandelt Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
        Vorschriften. Bedenken Sie aber bitte, dass die Datenübertragung im Internet grundsätzlich mit Sicherheitslücken bedacht sein kann.
        Ein vollumfänglicher Schutz vor dem Zugriff durch Fremde ist nicht realisierbar.
      </Typography>

      <H3>Zugriffsdaten</H3>
      <Typography paragraph>
        Der Websitebetreiber bzw. Seitenprovider erhebt Daten über Zugriffe auf die Seite und speichert diese für einige Monate ab. Unter
        anderem wird auch Ihre IP gespeichert.
      </Typography>

      <H3>Cookies</H3>
      <Typography paragraph>Auf dieser Website werden keine Cookies gesetzt.</Typography>

      <H3>Analysetools</H3>
      <Typography paragraph>Auf dieser Website werden keine Analysetools eingesetzt.</Typography>

      <H3>Umgang mit personenbezogenen Daten</H3>
      <Typography paragraph>
        Diese Website dient der Information und Anmeldung zu den Ökumenischen Ferienspielen {config.year} in Rothenbergen. Wir erheben,
        nutzen und geben Ihre personenbezogenen Daten nur dann weiter, wenn dies im gesetzlichen Rahmen erlaubt ist oder Sie in die
        Datenerhebung einwilligen.
      </Typography>
      <Typography paragraph>
        Für die Anmeldung Ihres Kindes zu den Ferienspielen werden personenbezogene Daten von uns digital erhoben und verarbeitet. Welche
        personenbezogenen Daten dabei an uns übermittelt werden, ergibt sich aus der Eingabemaske, die für die Registrierung verwendet wird.
        Die von Ihnen eingegebenen personenbezogenen Daten werden ausschließlich für die Vorbereitung und Durchführung der Ferienspiele
        erhoben und gespeichert.
      </Typography>
      <Typography paragraph>
        Die personenbezogenen Daten werden den hauptamtlich Verantwortlichen der Ferienspiele in digitaler Form zugänglich gemacht. Eine
        Weitergabe an die Betreuungspersonen der Ferienspiele erfolgt nur in dem Umfang, der für einen reibungslosen und sicheren Ablauf
        notwendig ist. (Zwei Beispiele: Weitergabe der Namen, Notfallkontakte und Allergieinformationen an die Betreuenden nur in
        Papierform; Weitergabe der Namen und Allergieinformationen an das Küchenpersonal).
      </Typography>
      <Typography paragraph>
        Die Ökumenischen Ferienspiele Rothenbergen werden von der Gemeinde Gründau sowie durch das Kreisjugendwerk Hessen der
        Evangelisch-methodistischen Kirche mit Zuschüssen gefördert. Die Beantragung dieser Zuschüsse erfordert Teilnehmerlisten, aus denen
        Name, Wohnort und Geburtsdatum der teilnehmenden Kinder hervorgehen. Diese Listen werden von uns nach Ende der Ferienspiele in
        Papierform an die zuständigen Behörden weitergeleitet. Abgesehen von dieser speziellen Weitergabe zum Zwecke der Zuschussbeantragung
        erfolgt die Verarbeitung und Verwendung der personenbezogenen Daten nur intern.
      </Typography>
      <Typography paragraph>
        Mit der Anmeldung stellen Sie uns auch Kontaktdaten wie Emailadresse oder Telefonnummer zur Verfügung. Wir werden diese nur nutzen,
        um mit Ihnen Informationen über die Ferienspiele auszutauschen oder Absprachen mit Ihnen zu treffen. Rechte des Nutzers: Auskunft,
        Berichtigung und Löschung Sie als Nutzer erhalten auf Antrag Ihrerseits kostenlose Auskunft darüber, welche personenbezogenen Daten
        über Sie gespeichert wurden. Sofern Ihr Wunsch nicht mit einer gesetzlichen Pflicht zur Aufbewahrung von Daten (z. B.
        Vorratsdatenspeicherung) kollidiert, haben Sie ein Anrecht auf Berichtigung falscher Daten und auf die Sperrung oder Löschung Ihrer
        personenbezogenen Daten.
      </Typography>
    </>
  );
}
