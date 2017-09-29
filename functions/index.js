const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const nodemailer = require('nodemailer');
const mailSender = '"Philipp Jardas" <phjardas@gmail.com>';
const gmailConfig = functions.config().gmail;
const mailTransport = nodemailer.createTransport(
  `smtps://${encodeURIComponent(gmailConfig.email)}:${encodeURIComponent(gmailConfig.password)}@smtp.gmail.com`);


exports.updateRegistrationCount = functions.database.ref('/registrations/{id}').onWrite(event => {
  const registrationsRef = event.data.ref.parent;
  return registrationsRef.once('value')
    .then(data => data.numChildren())
    .then(count => registrationsRef.parent.child('/registrationCount').set(count));
});


exports.sendRegistrationMail = functions.database.ref('/registrations/{id}').onCreate(event => {
  const reg = event.data.val();
  const id = event.params.id;
  const rootRef = event.data.ref.parent.parent;

  rootRef.child('config').once('value').then(c => c.val()).then(config => {
    console.log('Creating registration email for %s:', id, { reg, config });

    function date(d) {
      const [year, month, day] = d.split(/-/);
      return `${day}.${month}.${year}`;
    };

    return {
      from: mailSender,
      to: reg.parent.email,
      subject: `[Ferienspiele Rothenbergen] Anmeldung von ${reg.child.firstName} ${reg.child.lastName}`,
      text: ```Herzlichen Dank für die Anmeldung ${reg.child.gender === 'w' ? 'Ihrer Tochter' : 'Ihres Sohnes'} ${reg.child.firstName} ${reg.child.lastName} zu den Ferienspielen Rothenbergen

      Die Anmeldung ist noch nicht vollständig:
      * Bitte bezahlen Sie den Teilnahmebeitrag von € ${reg.price.total.toFixed(2)}.
      * Bitte unterschreiben Sie die Einverständniserklärung bis zum ${date(config.waiverDeadline)}.

      Bitte öffnen Sie die Seite https://ferienspiele-rothenbergen.de/anmeldung/${id}. Dort können Sie die Bankverbindung einsehen und die Einverständniserklärung ausdrucken.

      Mit freundlichen Grüßen
      Ihr Ferienspiele-Team```,
    };
  })
  .then(email => {
    const timestamp = Date.now();
    const emailsRef = rootRef.child('emails');
    console.log('Sending registration email:', email);
    return mailTransport.sendMail(email)
    .then(_=> {
      console.log('Registration email sent:', email);
      return emailsRef.push(Object.assign({}, email, { timestamp, success: true }));
    })
    .catch(err => {
      console.error('Error sending registration email:', err);
      return emailsRef.push(Object.assign({}, email, { timestamp, success: false, error: err.message }));
    });
  });
});
