const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const mailSender = '"Philipp Jardas" <phjardas@gmail.com>';
const gmailConfig = functions.config().gmail;
const mailTransport = nodemailer.createTransport(
  `smtps://${encodeURIComponent(gmailConfig.email)}:${encodeURIComponent(gmailConfig.password)}@smtp.gmail.com`
);

function createWelcomeMail(reg, config) {
  function date(d) {
    const [year, month, day] = d.split(/-/);
    return `${day}.${month}.${year}`;
  }

  const { id, child, price } = reg;
  const { waiverDeadline } = config;

  let text = `Herzlichen Dank für die Anmeldung ${child.gender === 'w' ? 'Ihrer Tochter' : 'Ihres Sohnes'} ${child.firstName} ${
    child.lastName
  } zu den Ferienspielen Rothenbergen\n`;
  text += '\n';
  text += 'Bitte beachten Sie, dass Sie für die vollständige Anmeldung noch folgende Schritte durchführen müssen:\n';
  text += '\n';
  text += `1. Öffnen Sie die Seite https://ferienspiele-rothenbergen.de/anmeldung/${id}. Dort können Sie die Bankverbindung einsehen und die Einverständniserklärung ausdrucken.\n`;
  text += '\n';
  text += `2. Bitte bezahlen Sie den Teilnahmebeitrag von € ${price.total.toFixed(2)} gemäß den Anweisungen auf der obigen Seite.\n`;
  text += '\n';
  text += `3. Bitte drucken und unterschreiben Sie die Einverständniserklärung und geben Sie sie bis zum ${date(
    waiverDeadline
  )} bei uns ab.\n`;
  text += '\n';
  text += 'Mit freundlichen Grüßen\n';
  text += 'Ihr Ferienspiele-Team\n';
  return text;
}

function sendRegistrationMail(event) {
  const id = event.params.id;
  const reg = Object.assign({}, event.data.val(), { id });
  const rootRef = event.data.ref.parent.parent;

  return rootRef
    .child('config')
    .once('value')
    .then(c => c.val())
    .then(config => ({
      from: mailSender,
      to: reg.parent.email,
      subject: `[Ferienspiele Rothenbergen] Anmeldung von ${reg.child.firstName} ${reg.child.lastName}`,
      text: createWelcomeMail(reg, config),
    }))
    .then(email => {
      const timestamp = Date.now();
      const emailsRef = rootRef.child('emails');
      console.info('Sending registration email:', email);
      return mailTransport
        .sendMail(email)
        .then(_ => {
          console.info('Registration email sent:', email);
          return emailsRef.push(Object.assign({}, email, { timestamp, registrationId: reg.id, success: true }));
        })
        .catch(err => {
          console.error('Error sending registration email:', err);
          return emailsRef.push(Object.assign({}, email, { timestamp, registrationId: reg.id, success: false, error: err.message }));
        });
    });
}

function updateKuchenStats(event) {
  const id = event.params.id;
  const { kuchen } = event.data.val();

  if (kuchen.date !== 'none' && kuchen.date !== 'geschwister') {
    const kuchenRef = event.data.adminRef.root.child('kuchen').child(kuchen.date);
    return kuchenRef.transaction(
      value =>
        value
          ? Object.assign({}, value, {
              amount: value.amount + 1,
              details: Object.assign({}, value.details, { [id]: { kuchen: kuchen.name } }),
            })
          : { amount: 1, details: { [id]: { kuchen: kuchen.name } } }
    );
  }
}

exports.sendRegistrationMail = functions.database
  .ref('/registrations/{id}')
  .onCreate(event => Promise.all([sendRegistrationMail(event), updateKuchenStats(event)]));
