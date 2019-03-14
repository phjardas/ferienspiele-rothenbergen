import * as admin from 'firebase-admin';
import config from './config';
import { mailTransport } from './email';

const mailSender = '"Ferienspiele Rothenbergen" <ferienspiele.rothenbergen@gmail.com>';

const emailsColl = admin.firestore().collection('emails');

function date(value, options = { year: 'numeric', month: '2-digit', day: '2-digit' }) {
  if (!value) return null;
  if (typeof value !== 'string' && 'seconds' in value && 'nanoseconds' in value) value = new Date(value.seconds * 1000);
  if (typeof value === 'string') value = new Date(value);
  return value.toLocaleDateString('de-DE', options);
}

function createWelcomeMail(reg) {
  const { id, child, price, kuchen } = reg;
  const { waiverDeadline } = config;

  let text = `Herzlichen Dank für die Anmeldung von ${child.firstName} ${child.lastName} zu den Ferienspielen Rothenbergen!\n`;
  text += '\n';
  text += 'Bitte beachten Sie, dass Sie für die vollständige Anmeldung noch folgende Schritte durchführen müssen:\n';
  text += '\n';
  text += `1. Öffnen Sie die Seite ${
    config.baseUrl
  }/anmeldung/${id}. Dort können Sie die Bankverbindung einsehen und die Einverständniserklärung ausdrucken.\n`;
  text += '\n';
  text += `2. Bitte bezahlen Sie den Teilnahmebeitrag von € ${price.total.toFixed(2)} gemäß den Anweisungen auf der obigen Seite.\n`;
  text += '\n';
  text += `3. Bitte drucken und unterschreiben Sie die Einverständniserklärung und geben Sie sie bis zum ${date(
    waiverDeadline
  )} bei uns ab.\n`;
  text += '\n';

  text += 'Kuchen\n';
  text += '======\n';
  text += '\n';
  switch (kuchen.selection) {
    case 'none':
      text += 'Sie bringen leider keinen Kuchen mit.\n';
      break;
    case 'geschwister':
      text += 'Sie bringen schon für ein Geschwisterkind einen Kuchen mit.\n';
      break;
    default:
      text += `Sie bringen am ${date(kuchen.date)} eine(n) ${kuchen.name} mit. Vielen Dank!\n`;
      break;
  }

  text += '\n';
  text += 'Mit freundlichen Grüßen\n';
  text += 'Ihr Ferienspiele-Team\n';
  return text;
}

export default async function sendRegistrationMail(reg) {
  const email = {
    from: mailSender,
    to: reg.parent.email,
    subject: `[Ferienspiele Rothenbergen] Anmeldung von ${reg.child.firstName} ${reg.child.lastName}`,
    text: createWelcomeMail(reg),
  };

  const timestamp = Date.now();

  try {
    console.info('Sending registration email:', email);
    await mailTransport.sendMail(email);
    console.info('Registration email sent:', { email });
    return emailsColl.add({ ...email, timestamp, registrationId: reg.id, success: true });
  } catch (error) {
    console.info('Registration email failed:', { email, error });
    return emailsColl.add({ ...email, timestamp, registrationId: reg.id, success: false, error: error.message });
  }
}
