import React from 'react';

export default function Welcome() {
  const startDate = new Date('2017-07-01');
  const endDate = new Date('2017-07-05');
  const registrationDeadline = new Date('2017-06-15');

  const enableTestData = true;
  const createTestData = e => {
    e.preventDefault();
  };

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h2 className="display-3">Anmeldung</h2>
        <p className="lead">
          Wir freuen uns, dass Sie Ihr Kind bei den Ferienspielen Rothenbergen vom {startDate.toLocaleDateString()} bis{' '}
          {endDate.toLocaleDateString()} anmelden wollen.{' '}
          <strong>Anmeldeschluss ist am {registrationDeadline.toLocaleDateString()} - oder wenn alle Plätze belegt sind.</strong>
        </p>
        <p>Nach der Anmeldung erhalten Sie von uns eine Email mit der Anmeldebestätigung sowie der Einverständniserklärung.</p>
        <div className="row">
          <div className="col-md-6">
            <p>
              Die <strong>Einverständniserklärung</strong> lassen Sie uns bitte unterschrieben von einem/einer Erziehungsberechtigten an
              folgende Adresse zukommen:
            </p>
            <p>
              Gemeindebüro Christkönig <br />
              Niedergründauer Straße 20 <br />
              63584 Gründau
            </p>
          </div>
          <div className="col-md-6">
            <p>
              Den <strong>Teilnahmebeitrag</strong> können Sie in bar der Einverständniserklärung beilegen – oder Sie überweisen ihn direkt
              an:
            </p>
            <p>
              EmK Bezirk Rothenbergen <br />
              IBAN: DE38 5075 0094 0027 0509 92 <br />
              Betreff: NAME DES KINDES, Ferienspiele 2018
            </p>
          </div>
        </div>
        <p>
          Bitte beachten Sie, dass die Anmeldung erst vollständig ist, wenn Einverständniserklärung und Teilnahmebeitrag bei uns eingegangen
          sind!
        </p>
        <p>
          Bei nachträglichen Änderungen nehmen Sie bitte telefonisch unter <a href="tel:+4960512649">06051 2649</a> oder per Email unter{' '}
          <a href="mailto:gillian.horton-krueger@emk-rothenbergen.de">gillian.horton-krueger@emk-rothenbergen.de</a> Kontakt mit uns auf.
        </p>
        <p>
          <small>Bitte füllen Sie alle Felder aus, es sei denn sie sind mit "optional" gekennzeichnet.</small>
        </p>
        {enableTestData && (
          <button className="btn btn-outline-primary" onClick={createTestData}>
            Testdaten erzeugen
          </button>
        )}
      </div>{' '}
    </div>
  );
}
