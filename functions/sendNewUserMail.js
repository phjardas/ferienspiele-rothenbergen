const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const mailSender = '"Philipp Jardas" <phjardas@gmail.com>';
const gmailConfig = functions.config().gmail;
const mailTransport = nodemailer.createTransport(
  `smtps://${encodeURIComponent(gmailConfig.email)}:${encodeURIComponent(gmailConfig.password)}@smtp.gmail.com`);


exports.sendNewUserMail = functions.auth.user().onCreate(event => {
  const { uid, email, displayName } = event.data;
  const mail = {
    from: mailSender,
    to: mailSender,
    subject: '[Ferienspiele Rothenbergen] Neuer Benutzer',
    text: `Ein neuer Benutzer hat sich registriert:

    ID: ${uid}
    E-Mail: ${email}
    Name: ${displayName}

    https://ferienspiele-rothenbergen.de/admin/users;id=${uid}`,
  };

  return mailTransport.sendMail(mail).then(_=> console.info('User registration email sent:', mail));
});
